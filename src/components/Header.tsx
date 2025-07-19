import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Clock, Star, Calendar, Gamepad2, User, BookOpen, UtensilsCrossed, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Menu', href: '/menu', icon: Star },
    { name: 'Book Table', href: '/book-table', icon: Calendar },
    { name: 'Games', href: '/games', icon: Gamepad2 },
    { name: 'About', href: '/about', icon: null },
  ];

  const userNavigation = [
    { name: 'My Bookings', href: '/my-bookings', icon: BookOpen },
    { name: 'My Orders', href: '/orders', icon: UtensilsCrossed },
  ];

  const adminNavigation = [
    { name: 'Manage Menu', href: '/admin/menu', icon: Star },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Savory Haven</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                  {item.name}
                </Button>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-1 ml-4 border-l pl-4">
                {userNavigation.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
                
                {user?.isAdmin && adminNavigation.map((item) => (
                  <Link key={item.name} to={item.href}>
                    <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
                
                <Button variant="ghost" size="sm" onClick={logout} className="text-foreground hover:text-primary">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:text-primary"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    {item.name}
                  </Button>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="border-t pt-2 mt-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-foreground hover:text-primary"
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                    
                    {user?.isAdmin && adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-foreground hover:text-primary"
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                    
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start text-foreground hover:text-primary"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-2 border-t pt-2 mt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};