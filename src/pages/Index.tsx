import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { BookingSystem } from '@/components/BookingSystem';
import { MenuCard } from '@/components/MenuCard';
import { 
  Calendar, 
  Clock, 
  Star, 
  Gamepad2, 
  Users, 
  ChefHat,
  Award,
  Phone,
  MapPin
} from 'lucide-react';
import heroImage from '@/assets/hero-restaurant.jpg';

const Index = () => {
  // Sample menu items
  const featuredItems = [
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon grilled to perfection with lemon herbs',
      price: 28.99,
      category: 'Main Course',
      rating: 4.5,
      votes: 124,
      isVegetarian: false,
      isSpicy: false
    },
    {
      id: '2',
      name: 'Truffle Risotto',
      description: 'Creamy Arborio rice with wild mushrooms and truffle oil',
      price: 24.99,
      category: 'Main Course',
      rating: 4.8,
      votes: 89,
      isVegetarian: true,
      isSpicy: false
    },
    {
      id: '3',
      name: 'Spicy Thai Curry',
      description: 'Authentic red curry with coconut milk and fresh vegetables',
      price: 19.99,
      category: 'Main Course',
      rating: 4.3,
      votes: 156,
      isVegetarian: true,
      isSpicy: true
    }
  ];

  const handleRatingChange = (itemId: string, rating: number) => {
    console.log(`Item ${itemId} rated ${rating} stars`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Savory Haven
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Where exceptional flavors meet memorable experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg"  variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground 		hover:text-neutral-200" >
                <Star className="w-5 h-5 mr-1" />
                Explore Menu
              </Button>
            </Link>
            <Link to="/book-table">
              <Button size="lg" variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                Book Table
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose Savory Haven?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Early Bird Discounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book 1+ hours in advance and get 10% off your entire order!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Game Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enjoy table tennis and 8-ball pool with special daytime rates!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Rate & Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share your experience and help others discover amazing dishes!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Dishes</h2>
            <p className="text-muted-foreground">Try our chef's special recommendations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onRatingChange={handleRatingChange}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                <ChefHat className="w-5 h-5 mr-2" />
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Quick Booking</h2>
            <p className="text-muted-foreground">Reserve your table or game session now</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BookingSystem type="table" />
            <BookingSystem type="game" gameType="table-tennis" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Savory Haven</h3>
              <p className="text-background/80 mb-4">
                Experience culinary excellence in a warm, welcoming atmosphere.
              </p>
              <div className="flex items-center gap-2 text-background/80">
                <Award className="w-4 h-4" />
                <span>Award-winning cuisine since 2020</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <div className="space-y-2 text-background/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Culinary Street, Food City</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Sun: 10:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/menu" className="block text-background/80 hover:text-background">
                  Menu
                </Link>
                <Link to="/book-table" className="block text-background/80 hover:text-background">
                  Book Table
                </Link>
                <Link to="/games" className="block text-background/80 hover:text-background">
                  Games
                </Link>
                <Link to="/about" className="block text-background/80 hover:text-background">
                  About Us
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 Savory Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
