import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Gamepad2 } from 'lucide-react';

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();

  // Mock bookings data - replace with your backend integration
  const mockBookings = [
    {
      id: 1,
      type: 'table',
      date: '2024-01-15',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      discount: 10,
      details: 'Table for 4 people'
    },
    {
      id: 2,
      type: 'game',
      game: 'Table Tennis',
      date: '2024-01-16',
      time: '14:00',
      duration: 2,
      status: 'confirmed',
      discount: 20,
      details: 'Day time booking'
    },
    {
      id: 3,
      type: 'table',
      date: '2024-01-20',
      time: '20:30',
      guests: 2,
      status: 'pending',
      discount: 0,
      details: 'Romantic dinner for 2'
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
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
            {mockBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {booking.type === 'table' ? (
                        <Calendar className="w-5 h-5" />
                      ) : (
                        <Gamepad2 className="w-5 h-5" />
                      )}
                      {booking.type === 'table' ? 'Table Booking' : `${booking.game} Booking`}
                    </CardTitle>
                    <Badge className={`${getStatusColor(booking.status)} text-white`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <CardDescription>{booking.details}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    {booking.type === 'table' && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{booking.guests} guests</span>
                      </div>
                    )}
                    {booking.discount > 0 && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {booking.discount}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {booking.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm">Modify</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button variant="outline" size="sm">View Details</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockBookings.length === 0 && (
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