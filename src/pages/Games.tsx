import { useState } from 'react';
import { Header } from '@/components/Header';
import { BookingSystem } from '@/components/BookingSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, Trophy, Star, Gamepad2 } from 'lucide-react';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<'table-tennis' | '8-ball-pool'>('table-tennis');

  const gameInfo = {
    'table-tennis': {
      name: 'Table Tennis',
      description: 'Professional-grade table tennis tables in a climate-controlled environment',
      price: {
        day: 15, // per hour
        night: 25
      },
      capacity: '2-4 players',
      features: [
        'Professional tournament tables',
        'High-quality paddles and balls provided',
        'Scoreboard and timer',
        'Comfortable seating area'
      ]
    },
    '8-ball-pool': {
      name: '8-Ball Pool',
      description: 'Authentic pool tables with professional cloth and equipment',
      price: {
        day: 20, // per hour
        night: 30
      },
      capacity: '2-8 players',
      features: [
        'Professional 9-foot tables',
        'Aramith pool balls',
        'Premium cue sticks available',
        'Chalk and accessories provided'
      ]
    }
  };

  const currentGame = gameInfo[selectedGame];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Game Zone
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Enjoy premium gaming experiences with friends and family
          </p>
        </div>
      </section>

      {/* Game Selection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={selectedGame} onValueChange={(value) => setSelectedGame(value as any)}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="table-tennis" className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Table Tennis
              </TabsTrigger>
              <TabsTrigger value="8-ball-pool" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                8-Ball Pool
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table-tennis" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <GameDetails game={currentGame} />
                <BookingSystem type="game" gameType="table-tennis" />
              </div>
            </TabsContent>

            <TabsContent value="8-ball-pool" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <GameDetails game={currentGame} />
                <BookingSystem type="game" gameType="8-ball-pool" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Pricing & Discounts
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-card shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  Daytime Rates
                </CardTitle>
                <p className="text-sm text-muted-foreground">10:00 AM - 5:00 PM</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Table Tennis</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">$15</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">8-Ball Pool</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">$20</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground w-full justify-center">
                  Extra 15% OFF for advance bookings!
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Star className="w-5 h-5 text-primary" />
                  Night Rates
                </CardTitle>
                <p className="text-sm text-muted-foreground">5:00 PM - 10:00 PM</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Table Tennis</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">$25</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">8-Ball Pool</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">$30</span>
                    <span className="text-muted-foreground">/hour</span>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground w-full justify-center">
                  Extra 5% OFF for advance bookings!
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Game Rules */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Game Rules & Guidelines
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card shadow-warm">
              <CardHeader>
                <CardTitle className="text-foreground">General Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Minimum booking duration: 1 hour</li>
                  <li>• Maximum booking duration: 4 hours</li>
                  <li>• All equipment provided at no extra charge</li>
                  <li>• Food and beverages allowed from our restaurant</li>
                  <li>• Reservations recommended, especially evenings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-warm">
              <CardHeader>
                <CardTitle className="text-foreground">Booking Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 10% off for 1+ hour advance bookings</li>
                  <li>• Additional discounts for daytime slots</li>
                  <li>• Free equipment upgrades available</li>
                  <li>• Complimentary scorekeeping service</li>
                  <li>• Priority seating for dining after games</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

const GameDetails = ({ game }: { game: any }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-warm">
        <CardHeader>
          <CardTitle className="text-foreground">{game.name}</CardTitle>
          <p className="text-muted-foreground">{game.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Day Rate</div>
              <div className="text-2xl font-bold text-primary">${game.price.day}/hr</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Night Rate</div>
              <div className="text-2xl font-bold text-primary">${game.price.night}/hr</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground">{game.capacity}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-warm">
        <CardHeader>
          <CardTitle className="text-foreground">Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {game.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
// fetch("http://localhost/restaurant/bookingfor8ball.php", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     full_name: "John Doe",
//     email: "john@example.com",
//     booking_date: "2025-07-18",
//     booking_time: "17:30:00"
//   })
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log("Response from PHP:", data);
//   })
//   .catch(error => {
//     console.error("Error:", error);
//   });


export default Games;