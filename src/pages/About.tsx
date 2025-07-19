import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Users, 
  Clock, 
  Star, 
  Heart, 
  ChefHat, 
  MapPin, 
  Phone,
  Mail,
  Link
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Chef Marco Romano',
      role: 'Executive Chef',
      description: 'Award-winning chef with 15+ years of culinary excellence',
      specialty: 'Italian & Mediterranean Cuisine'
    },
    {
      name: 'Sarah Chen',
      role: 'Restaurant Manager',
      description: 'Hospitality expert ensuring exceptional dining experiences',
      specialty: 'Customer Service & Operations'
    },
    {
      name: 'David Martinez',
      role: 'Head of Games',
      description: 'Sports enthusiast managing our recreational activities',
      specialty: 'Game Zone & Entertainment'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Best Restaurant 2023',
      description: 'Awarded by City Food Critics Association'
    },
    {
      icon: Star,
      title: '4.8/5 Rating',
      description: 'Average customer rating across all platforms'
    },
    {
      icon: Users,
      title: '50,000+ Happy Customers',
      description: 'Served since our opening in 2020'
    },
    {
      icon: Heart,
      title: 'Community Favorite',
      description: 'Voted #1 by local food bloggers'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            About Savory Haven
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            A culinary destination where exceptional food meets unforgettable experiences
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2020, Savory Haven was born from a simple vision: to create a place where 
              exceptional cuisine meets genuine hospitality. What started as a dream to serve the 
              community has grown into a beloved dining destination that combines award-winning food 
              with recreational entertainment.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our unique concept brings together fine dining with interactive gaming, offering guests 
              the perfect blend of culinary excellence and social entertainment. From our carefully 
              crafted menu to our professional game facilities, every aspect of Savory Haven is 
              designed to create lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Achievements
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center bg-gradient-card shadow-warm">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Our Team</h2>
            <p className="text-muted-foreground">The passionate people behind your exceptional experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gradient-card shadow-warm">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{member.name}</CardTitle>
                  <Badge className="bg-primary text-primary-foreground w-fit mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-muted-foreground">{member.description}</p>
                  <div className="text-sm text-primary font-medium">
                    Specialty: {member.specialty}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Our Mission & Values
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Heart className="w-5 h-5 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To provide an unparalleled dining and entertainment experience that brings 
                    people together through exceptional food, outstanding service, and memorable 
                    moments. We strive to be the heart of our community, where every visit 
                    feels like coming home.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Star className="w-5 h-5 text-primary" />
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Excellence in every dish we serve</li>
                    <li>• Genuine hospitality and care for our guests</li>
                    <li>• Support for local suppliers and community</li>
                    <li>• Innovation in culinary arts and entertainment</li>
                    <li>• Sustainability and environmental responsibility</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground">We'd love to hear from you and answer any questions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Culinary Street<br />
                  Food City, FC 12345
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  (555) 123-4567<br />
                  Mon-Sun: 10AM-10PM
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card shadow-warm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-foreground">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  info@savoryhaven.com<br />
                  reservations@savoryhaven.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
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

export default About;