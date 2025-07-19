import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, DollarSign, Utensils } from 'lucide-react';

const Orders = () => {
  const { user, isAuthenticated } = useAuth();

  // Mock orders data - replace with your backend integration
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      time: '19:00',
      status: 'completed',
      total: 67.50,
      items: [
        { name: 'Grilled Salmon', quantity: 2, price: 28.00 },
        { name: 'Caesar Salad', quantity: 1, price: 14.00 },
        { name: 'Red Wine', quantity: 1, price: 25.50 }
      ],
      tableBooking: 'Table 12'
    },
    {
      id: 'ORD-002',
      date: '2024-01-16',
      time: '14:30',
      status: 'preparing',
      total: 34.00,
      items: [
        { name: 'Chicken Pasta', quantity: 1, price: 22.00 },
        { name: 'Iced Tea', quantity: 2, price: 6.00 }
      ],
      tableBooking: 'Table 8'
    },
    {
      id: 'ORD-003',
      date: '2024-01-20',
      time: '20:30',
      status: 'pending',
      total: 89.75,
      items: [
        { name: 'Ribeye Steak', quantity: 2, price: 35.00 },
        { name: 'Chocolate Cake', quantity: 2, price: 12.00 },
        { name: 'Coffee', quantity: 2, price: 4.75 }
      ],
      tableBooking: 'Table 15'
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
              <CardDescription>Please login to view your orders</CardDescription>
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
      case 'completed':
        return 'bg-green-500';
      case 'preparing':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'preparing':
        return 'Preparing';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track your food orders and order history</p>
          </div>

          <div className="grid gap-6">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="w-5 h-5" />
                      Order {order.id}
                    </CardTitle>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <CardDescription>{order.tableBooking}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{order.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.name}</span>
                            <Badge variant="outline" className="text-xs">
                              x{item.quantity}
                            </Badge>
                          </div>
                          <span className="text-sm font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <Button variant="destructive" size="sm">Cancel Order</Button>
                    )}
                    {order.status === 'completed' && (
                      <Button variant="outline" size="sm">Reorder</Button>
                    )}
                    <Button variant="outline" size="sm">View Receipt</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {mockOrders.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Utensils className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You have no orders yet.</p>
                <Button onClick={() => window.location.href = '/menu'}>
                  Browse Menu
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;