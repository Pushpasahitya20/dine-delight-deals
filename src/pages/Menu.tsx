import { useState } from 'react';
import { Header } from '@/components/Header';
import { MenuCard } from '@/components/MenuCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuItems = [
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon grilled to perfection with lemon herbs and seasonal vegetables',
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
      description: 'Creamy Arborio rice with wild mushrooms, truffle oil, and parmesan cheese',
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
      description: 'Authentic red curry with coconut milk, fresh vegetables, and jasmine rice',
      price: 19.99,
      category: 'Main Course',
      rating: 4.3,
      votes: 156,
      isVegetarian: true,
      isSpicy: true
    },
    {
      id: '4',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with homemade croutons, parmesan, and Caesar dressing',
      price: 12.99,
      category: 'Appetizer',
      rating: 4.2,
      votes: 67,
      isVegetarian: true,
      isSpicy: false
    },
    {
      id: '5',
      name: 'Chicken Wings',
      description: 'Buffalo-style chicken wings with blue cheese dip and celery sticks',
      price: 14.99,
      category: 'Appetizer',
      rating: 4.6,
      votes: 203,
      isVegetarian: false,
      isSpicy: true
    },
    {
      id: '6',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
      price: 8.99,
      category: 'Dessert',
      rating: 4.9,
      votes: 145,
      isVegetarian: true,
      isSpicy: false
    },
    {
      id: '7',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
      price: 7.99,
      category: 'Dessert',
      rating: 4.7,
      votes: 98,
      isVegetarian: true,
      isSpicy: false
    },
    {
      id: '8',
      name: 'Craft Beer',
      description: 'Local IPA with citrus notes and hoppy finish',
      price: 6.99,
      category: 'Beverage',
      rating: 4.4,
      votes: 87,
      isVegetarian: true,
      isSpicy: false
    },
    {
      id: '9',
      name: 'Fresh Mojito',
      description: 'Refreshing cocktail with mint, lime, and white rum',
      price: 9.99,
      category: 'Beverage',
      rating: 4.3,
      votes: 112,
      isVegetarian: true,
      isSpicy: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'Appetizer', name: 'Appetizers' },
    { id: 'Main Course', name: 'Main Courses' },
    { id: 'Dessert', name: 'Desserts' },
    { id: 'Beverage', name: 'Beverages' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRatingChange = (itemId: string, rating: number) => {
    console.log(`Item ${itemId} rated ${rating} stars`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Our Menu
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with fresh, local ingredients
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-primary text-primary-foreground" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No items found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  onRatingChange={handleRatingChange}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {menuItems.length}
              </div>
              <div className="text-muted-foreground">Menu Items</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {menuItems.reduce((sum, item) => sum + item.votes, 0)}
              </div>
              <div className="text-muted-foreground">Total Reviews</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {(menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length).toFixed(1)}
              </div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {menuItems.filter(item => item.isVegetarian).length}
              </div>
              <div className="text-muted-foreground">Vegetarian Options</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;