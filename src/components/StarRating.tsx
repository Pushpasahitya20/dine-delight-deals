import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  readonly = false, 
  size = 'md' 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hoverRating || rating);
        
        return (
          <Button
            key={star}
            variant="ghost"
            size="sm"
            className={`p-1 h-auto ${!readonly ? 'hover:bg-transparent' : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors duration-200 ${
                filled 
                  ? 'fill-gold text-gold' 
                  : 'text-muted-foreground hover:text-gold'
              }`}
            />
          </Button>
        );
      })}
    </div>
  );
};