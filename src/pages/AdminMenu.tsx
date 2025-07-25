import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  rating: number;
  votes: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isAvailable: boolean;
}

const AdminMenu = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Mock menu items - replace with your backend integration
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with herbs',
      price: 28,
      category: 'Main Course',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      votes: 120,
      isVegetarian: false,
      isSpicy: false,
      isAvailable: true
    },
    {
      id: '2',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan',
      price: 14,
      category: 'Salads',
      image: '/api/placeholder/300/200',
      rating: 4.2,
      votes: 85,
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    rating: 0,
    votes: 0,
    isVegetarian: false,
    isSpicy: false,
    isAvailable: true
  });

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                {!isAuthenticated ? 'Please login to access this page' : 'Admin access required'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.href = !isAuthenticated ? '/login' : '/'} className="w-full">
                {!isAuthenticated ? 'Go to Login' : 'Go to Home'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const categories = ['Appetizers', 'Salads', 'Main Course', 'Desserts', 'Beverages'];

  const handleAddItem = async () => {
  if (!newItem.name || !newItem.description || !newItem.category) {
    toast({
      title: "Error",
      description: "Please fill in all required fields",
      variant: "destructive",
    });
    return;
  }

  try {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost/restaurant/add_menu_item.php",
    {
      name: newItem.name,
      description: newItem.description,
      price: newItem.price,
      category: newItem.category,
      image: newItem.image, // ✅ now matches PHP field
      isVegetarian: newItem.isVegetarian,
      isSpicy: newItem.isSpicy,
      votes: newItem.votes || 0 // optional
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data.success) {
    const addedItem: MenuItem = {
      id: Date.now().toString(), // replace with actual ID if returned
      ...newItem,
      rating: 0,
      votes: newItem.votes || 0,
    };

    setMenuItems([...menuItems, addedItem]);
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      rating: 0,
      votes: 0,
      isVegetarian: false,
      isSpicy: false,
      isAvailable: true,
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "Menu item added successfully!",
    });
  } else {
    toast({
      title: "Error",
      description: response.data.error || "Failed to add item",
      variant: "destructive",
    });
  }
} catch (error: any) {
  toast({
    title: "Error",
    description: error.message || "Something went wrong",
    variant: "destructive",
  });
}

};

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Menu item deleted successfully!",
    });
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Menu Management</h1>
              <p className="text-muted-foreground">Add, edit, and manage menu items</p>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Menu Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new menu item
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      placeholder="Enter item description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newItem.image}
                      onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={newItem.rating}
                        onChange={(e) => setNewItem({...newItem, rating: parseFloat(e.target.value) || 0})}
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="votes">Votes</Label>
                      <Input
                        id="votes"
                        type="number"
                        min="0"
                        value={newItem.votes}
                        onChange={(e) => setNewItem({...newItem, votes: parseInt(e.target.value) || 0})}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vegetarian"
                        checked={newItem.isVegetarian}
                        onCheckedChange={(checked) => setNewItem({...newItem, isVegetarian: !!checked})}
                      />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="spicy"
                        checked={newItem.isSpicy}
                        onCheckedChange={(checked) => setNewItem({...newItem, isSpicy: !!checked})}
                      />
                      <Label htmlFor="spicy">Spicy</Label>
                    </div>
                  </div>
                  <Button onClick={handleAddItem} className="w-full">
                    Add Item
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {categories.map(category => {
              const categoryItems = menuItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                    <CardDescription>{categoryItems.length} items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {categoryItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{item.name}</h3>
                              <Badge variant={item.isAvailable ? "default" : "secondary"}>
                                {item.isAvailable ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <p className="font-semibold">${item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAvailability(item.id)}
                            >
                              {item.isAvailable ? 'Disable' : 'Enable'}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;