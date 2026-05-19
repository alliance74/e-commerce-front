'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/products';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    showToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-peach-light overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative h-80">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge variant="gold">{product.badge}</Badge>
            </div>
          )}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white transition-colors"
          >
            <Heart
              size={20}
              className={inWishlist ? 'fill-orange text-orange' : 'text-espresso'}
            />
          </button>
        </div>
        <div className="p-6">
          <p className="font-ui text-xs text-warm-gray uppercase tracking-wide mb-2">
            {product.category}
          </p>
          <h3 className="font-display text-xl font-semibold text-espresso mb-2 line-clamp-2">
            {product.name}
          </h3>
          <StarRating rating={product.rating} size={14} />
          <div className="mt-4 flex items-center gap-2">
            {product.originalPrice && (
              <span className="font-ui text-sm text-warm-gray line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-display text-2xl text-orange font-semibold">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
