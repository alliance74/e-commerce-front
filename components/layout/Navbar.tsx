'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-display text-3xl font-bold text-espresso">
            HOTEL LIFE
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="font-ui text-espresso hover:text-orange transition-colors">
              Shop
            </Link>
            <Link href="/about" className="font-ui text-espresso hover:text-orange transition-colors">
              About
            </Link>
            <Link href="/wishlist" className="text-espresso hover:text-orange transition-colors">
              <Heart size={22} />
            </Link>
            <Link href="/cart" className="relative text-espresso hover:text-orange transition-colors">
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-ui">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href={user ? '/profile' : '/auth'} className="text-espresso hover:text-orange transition-colors">
              <User size={22} />
            </Link>
          </div>

          <button className="md:hidden text-espresso" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-warm-gray"
        >
          <div className="px-4 py-4 space-y-4">
            <Link href="/shop" className="block font-ui text-espresso" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link href="/about" className="block font-ui text-espresso" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/wishlist" className="block font-ui text-espresso" onClick={() => setMobileOpen(false)}>
              Wishlist
            </Link>
            <Link href="/cart" className="block font-ui text-espresso" onClick={() => setMobileOpen(false)}>
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
            <Link href={user ? '/profile' : '/auth'} className="block font-ui text-espresso" onClick={() => setMobileOpen(false)}>
              {user ? 'Profile' : 'Login'}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
