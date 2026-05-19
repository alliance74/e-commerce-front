'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/Button';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-peach flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart size={64} className="mx-auto text-warm-gray mb-4" />
          <h2 className="font-display text-3xl font-bold text-espresso mb-4">Your wishlist is empty</h2>
          <p className="font-ui text-warm-gray mb-8">Save your favorite items for later</p>
          <Link href="/shop">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peach py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold text-espresso mb-8"
        >
          My Wishlist
        </motion.h1>
        <p className="font-ui text-warm-gray mb-8">{items.length} {items.length === 1 ? 'item' : 'items'}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
