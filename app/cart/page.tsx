'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, subtotal } = useCart();
  const shipping = subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-peach flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag size={64} className="mx-auto text-warm-gray mb-4" />
          <h2 className="font-display text-3xl font-bold text-espresso mb-4">Your cart is empty</h2>
          <p className="font-ui text-warm-gray mb-8">Start shopping to add items to your cart</p>
          <Link href="/shop">
            <Button variant="primary">Continue Shopping</Button>
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
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, i) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-peach-light p-6 flex gap-6"
              >
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-espresso mb-2">
                    {item.product.name}
                  </h3>
                  {Object.entries(item.selectedVariants).map(([key, value]) => (
                    <p key={key} className="font-ui text-sm text-warm-gray">
                      {key}: {value}
                    </p>
                  ))}
                  <p className="font-display text-xl text-orange mt-2">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-warm-gray hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 border border-warm-gray hover:border-orange transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-ui w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 border border-warm-gray hover:border-orange transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-peach-light p-6 h-fit sticky top-24"
          >
            <h2 className="font-display text-2xl font-bold text-espresso mb-6">Order Summary</h2>
            <div className="space-y-3 font-ui text-warm-gray mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              {subtotal < 150 && (
                <p className="text-xs text-orange">Add {formatPrice(150 - subtotal)} more for free shipping</p>
              )}
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-warm-gray pt-3 flex justify-between font-display text-xl text-espresso font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button variant="primary" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="ghost" className="w-full mt-3">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
