import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Gamepad2 } from 'lucide-react';
import axios from 'axios';

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost/restaurant/get_user_bookings.php', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setBookings(response.data.bookings);
          console.log("response.data.bookings",response.data.bookings)
        } else {
          console.error('Failed to fetch bookings:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Login Required</CardTitle>
              <CardDescription>Please login to view your bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.href = '/login'} className="w-full">
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getBookingStatus = (booking: any) => {
    const today = new Date();
    const bookingDate = new Date(booking.booking_date);
    
    // If booking date has passed, mark as completed
    if (bookingDate < today && booking.status === 'confirmed') {
      return 'completed';
    }
    
    return booking.status || 'confirmed';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>

          <div className="grid gap-6">
            {bookings.map((booking: any) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {booking.type === 'table' ? (
                        <Calendar className="w-5 h-5" />
                      ) : (
                        <Gamepad2 className="w-5 h-5" />
                      )}
                      {booking.type === 'table' ? 'Table Booking' : `${booking.game || 'Game'} Booking`}
                    </CardTitle>
                    <Badge className={`${getStatusColor(getBookingStatus(booking))} text-white`}>
                      {getBookingStatus(booking)}
                    </Badge>
                  </div>
                  <CardDescription>{booking.details || 'Enjoy your booking!'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{booking.booking_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{booking.booking_time}</span>
                    </div>
                    {booking.guests && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{booking.guests} guests</span>
                      </div>
                    )}
                    {booking.discount && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {booking.discount}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    {getBookingStatus(booking) === 'pending' && (
                      <>
                        <Button variant="outline" size="sm">Modify</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </>
                    )}
                    {getBookingStatus(booking) === 'confirmed' && (
                      <Button variant="outline" size="sm">View Details</Button>
                    )}
                    {getBookingStatus(booking) === 'completed' && (
                      <Button variant="outline" size="sm">View Receipt</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {bookings.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">You have no bookings yet.</p>
                <Button onClick={() => window.location.href = '/book-table'}>
                  Make Your First Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
