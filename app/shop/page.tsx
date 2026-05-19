'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';
import { ProductCard } from '@/components/shop/ProductCard';
import { Filter } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (categoryParam !== 'all') {
      filtered = filtered.filter(p => p.category === categoryParam);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    filtered = filtered.filter(p => p.rating >= minRating);

    switch (sortBy) {
      case 'price_asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [categoryParam, sortBy, priceRange, minRating]);

  return (
    <div className="min-h-screen bg-peach py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-6xl font-bold text-espresso mb-8"
        >
          Shop Collection
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 mb-4 font-ui text-espresso"
            >
              <Filter size={20} />
              Filters
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-peach-light p-6 space-y-6`}>
              <div>
                <h3 className="font-ui font-semibold text-espresso mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <a
                      key={cat.id}
                      href={`/shop${cat.id !== 'all' ? `?category=${cat.id}` : ''}`}
                      className={`block font-ui text-sm ${
                        categoryParam === cat.id ? 'text-orange font-semibold' : 'text-warm-gray'
                      } hover:text-orange transition-colors`}
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-ui font-semibold text-espresso mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <p className="font-ui text-sm text-warm-gray">Up to ${priceRange[1]}</p>
                </div>
              </div>

              <div>
                <h3 className="font-ui font-semibold text-espresso mb-3">Minimum Rating</h3>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-warm-gray bg-white font-ui text-sm"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="font-ui text-warm-gray">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-warm-gray bg-white font-ui text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-ui text-warm-gray text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
