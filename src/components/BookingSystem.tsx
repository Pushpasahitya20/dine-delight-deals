import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Gamepad2, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';

interface BookingSystemProps {
  type: 'table' | 'game';
  gameType?: 'table-tennis' | '8-ball-pool';
}

export const BookingSystem = ({ type, gameType }: BookingSystemProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const tableId = 1
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const calculateDiscount = () => {
    if (!selectedDate || !selectedTime) return 0;
    
    const bookingDateTime = new Date(`${selectedDate} ${selectedTime}`);
    const now = new Date();
    const timeDiff = bookingDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    let discount = 0;
    
    // 10% off for booking 1+ hours in advance
    if (hoursDiff >= 1) {
      discount += 10;
    }
    
    // Additional discount for games during daytime
    if (type === 'game' && selectedTime) {
      const hour = parseInt(selectedTime.split(':')[0]);
      if (hour >= 10 && hour <= 17) {
        discount += 15; // 15% additional for daytime games
      } else {
        discount += 5; // 5% additional for night games
      }
    }
    
    return Math.min(discount, 25); // Cap at 25% total discount
  };

  const handleBooking = async () => {
  if (!isAuthenticated) {
    toast({
      title: "Login Required",
      description: "Please login first to make a booking.",
      variant: "destructive",
    });
    navigate('/login', { state: { from: location } });
    return;
  }

  if (!selectedDate || !selectedTime || !name || !email) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive"
    });
    return;
  }

  const discount = calculateDiscount();
  const bookingType = type === 'table' 
    ? 'Table' 
    : `${gameType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Game`;

  const apiURL = type === 'table'
    ? 'http://localhost/restaurant/book_table.php'
    : 'http://localhost/restaurant/api/game-booking.php';

  const postData = type === 'table'
    ? {
        booking_date: selectedDate,
        booking_time: selectedTime,
        guests: guests || 2,
        full_name: name,
        email: email,
        discount: `${discount}%`,
        table_id: 1
      }
    : {
        booking_date: selectedDate,
        booking_time: selectedTime,
        full_name: name,
        email: email,
        game_type: gameType,
        discount: `${discount}%`
      };

  try {
    const response = await axios.post(apiURL, postData);
    if (response.data.success) {
      toast({
        title: "Booking Confirmed!",
        description: `Your ${bookingType} booking for ${selectedDate} at ${selectedTime} has been confirmed${discount > 0 ? ` with ${discount}% discount!` : '!'}`,
        variant: "default"
      });

      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setGuests('2');
      setName('');
      setEmail('');
    } else {
      toast({
        title: "Booking Failed",
        description: response.data.message || "Something went wrong.",
        variant: "destructive"
      });
    }
  } catch (error) {
    toast({
      title: "Server Error",
      description: "Failed to submit booking. Please try again later.",
      variant: "destructive"
    });
    console.error("API Error:", error);
  }
};


  const handleBooking1 = async () => {
  const bookingData = {
    booking_date: selectedDate,
    booking_time: selectedTime,
    guests,
    full_name: name,
    email,
    discount: discount.toString(), // Optional, convert to string for PHP safety
    table_id: tableId
  };

  try {
    const res = await axios.post('http://localhost/restaurant/book_table.php', bookingData);
    alert(res.data.message); // or use a toast/snackbar
  } catch (error) {
    console.error("Booking failed:", error);
    alert("Something went wrong while booking.");
  }
};


  const discount = calculateDiscount();

  return (
    <Card className="bg-gradient-card shadow-warm border-border/50">
      <CardHeader className="space-y-2">
        <CardTitle className="flex items-center gap-2 text-foreground">
          {type === 'table' ? (
            <>
              <Calendar className="w-5 h-5 text-primary" />
              Book a Table
            </>
          ) : (
            <>
              <Gamepad2 className="w-5 h-5 text-primary" />
              Book {gameType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </>
          )}
        </CardTitle>
        {discount > 0 && (
          <Badge className="bg-success text-success-foreground w-fit">
            <Percent className="w-3 h-3 mr-1" />
            {discount}% Discount Applied!
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-background"
            />
          </div>
        </div>

        {type === 'table' && (
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <Input
                id="guests"
                type="number"
                min="1"
                max="12"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
        </div>

        <div className="bg-muted/50 p-3 rounded-md">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            Booking Rules:
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Book 1+ hours in advance for 10% off</li>
            {type === 'game' && (
              <li>• Daytime games (10 AM - 5 PM): Extra 15% off</li>
            )}
            {type === 'game' && (
              <li>• Night games (5 PM - 10 PM): Extra 5% off</li>
            )}
          </ul>
        </div>

        <Button 
          onClick={handleBooking}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          Confirm Booking 1
          {discount > 0 && (
            <Badge className="ml-2 bg-success text-success-foreground">
              -{discount}%
            </Badge>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};