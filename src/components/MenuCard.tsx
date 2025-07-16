import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { ShoppingCart, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
}

interface MenuCardProps {
  item: MenuItem;
  onRatingChange?: (itemId: string, rating: number) => void;
}

export const MenuCard = ({ item, onRatingChange }: MenuCardProps) => {
  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleRating = (rating: number) => {
    setUserRating(rating);
    if (onRatingChange) {
      onRatingChange(item.id, rating);
    }
    toast({
      title: "Rating Submitted",
      description: `You rated ${item.name} ${rating} star${rating !== 1 ? 's' : ''}!`,
      variant: "default"
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart!`,
      variant: "default"
    });
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 ml-2"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {item.isVegetarian && (
              <Badge variant="secondary" className="bg-success/10 text-success">
                Vegetarian
              </Badge>
            )}
            {item.isSpicy && (
              <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                Spicy
              </Badge>
            )}
          </div>

          {/* Rating Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StarRating rating={item.rating} readonly size="sm" />
                <span className="text-sm text-muted-foreground">
                  ({item.votes} votes)
                </span>
              </div>
              <span className="text-lg font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
            </div>
            
            {/* User Rating */}
            <div className="border-t pt-2">
              <p className="text-sm text-muted-foreground mb-2">Rate this dish:</p>
              <StarRating 
                rating={userRating} 
                onRatingChange={handleRating} 
                size="sm"
              />
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};