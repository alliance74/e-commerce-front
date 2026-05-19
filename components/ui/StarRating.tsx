import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
}

export function StarRating({ rating, size = 16, showNumber = true }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-gold text-gold' : 'text-warm-gray'}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm font-ui text-warm-gray">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
