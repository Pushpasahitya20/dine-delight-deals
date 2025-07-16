import { Header } from '@/components/Header';
import { BookingSystem } from '@/components/BookingSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, Phone, MapPin, Award } from 'lucide-react';

const BookTable = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Book Your Table
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Reserve your spot for an unforgettable dining experience
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Booking Form */}
            <div>
              <BookingSystem type="table" />
            </div>

            {/* Restaurant Info */}
            <div className="space-y-6">
              <Card className="bg-gradient-card shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Award className="w-5 h-5 text-primary" />
                    Restaurant Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">123 Culinary Street, Food City</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Hours</p>
                      <p className="text-muted-foreground">Mon-Sun: 10:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    Group Sizes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">2-4 people</span>
                    <Badge variant="secondary">Standard Tables</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">5-8 people</span>
                    <Badge variant="secondary">Large Tables</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">9-12 people</span>
                    <Badge className="bg-primary text-primary-foreground">Private Dining</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    Special Offers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-success text-success-foreground">Early Bird</Badge>
                      <span className="font-medium text-foreground">10% OFF</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Book 1+ hours in advance to get 10% off your entire order
                    </p>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary text-primary-foreground">Weekend Special</Badge>
                      <span className="font-medium text-foreground">Free Appetizer</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complimentary appetizer for groups of 4 or more on weekends
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Experience */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What to Expect
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Award-Winning Cuisine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience dishes crafted by our award-winning chef using the finest ingredients
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Exceptional Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our attentive staff ensures every moment of your dining experience is perfect
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Prime Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Located in the heart of the city with easy access and beautiful ambiance
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookTable;