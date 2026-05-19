'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { Heart, Minus, Plus, Check } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find(p => p.slug === params.slug);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="min-h-screen bg-peach flex items-center justify-center">
        <p className="font-ui text-warm-gray">Product not found</p>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    showToast('Added to cart');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    showToast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="min-h-screen bg-peach py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative h-[600px] bg-peach-light mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-24 ${
                    selectedImage === i ? 'ring-2 ring-orange' : ''
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {product.badge && <Badge variant="gold" className="mb-4">{product.badge}</Badge>}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.rating} />
              <span className="font-ui text-sm text-warm-gray">({product.reviewCount} reviews)</span>
            </div>
            <p className="font-ui text-warm-gray mb-6">{product.description}</p>
            <div className="flex items-center gap-3 mb-8">
              {product.originalPrice && (
                <span className="font-ui text-xl text-warm-gray line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-display text-4xl text-orange font-bold">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Variants */}
            {product.variants.map((variant) => (
              <div key={variant.label} className="mb-6">
                <p className="font-ui font-semibold text-espresso mb-2">{variant.label}</p>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedVariants({ ...selectedVariants, [variant.label]: option })}
                      className={`px-4 py-2 font-ui text-sm border transition-colors ${
                        selectedVariants[variant.label] === option
                          ? 'border-orange bg-orange text-white'
                          : 'border-warm-gray text-espresso hover:border-orange'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-ui font-semibold text-espresso mb-2">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-warm-gray hover:border-orange transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-ui text-lg w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-warm-gray hover:border-orange transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button onClick={handleAddToCart} variant="primary" className="flex-1">
                Add to Cart
              </Button>
              <Button onClick={handleWishlist} variant="ghost" className="px-4">
                <Heart className={isInWishlist(product.id) ? 'fill-orange' : ''} />
              </Button>
            </div>

            {/* Amenities */}
            <div className="border-t border-warm-gray pt-6">
              <div className="grid grid-cols-2 gap-3">
                {product.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check size={16} className="text-orange" />
                    <span className="font-ui text-sm text-warm-gray">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-4xl font-bold text-espresso mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
