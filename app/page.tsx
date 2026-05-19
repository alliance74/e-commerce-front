'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

export default function HomePage() {
  const bestsellers = products.filter(p => p.badge === 'Bestseller').slice(0, 4);
  const featured = products.find(p => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/hero10/1920/1080"
            alt="Luxury hotel interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-900/30 to-peach" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-[12vw] md:text-[8vw] font-bold text-white leading-none tracking-wider"
          >
            SHOP THE
            <br />
            HOTEL LIFE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-ui text-white/90 text-lg md:text-xl mt-6 mb-8"
          >
            Luxury hotel-grade products for your home
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/shop">
              <button className="bg-orange text-white px-10 py-4 text-lg font-ui font-medium hover:bg-orange-light transition-all">
                Explore Collection
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 gap-4"
        >
          {products.slice(0, 3).map((product, i) => (
            <div
              key={product.id}
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl"
              style={{ transform: `translateY(${i * 20}px)` }}
            >
              <Image src={product.images[0]} alt={product.name} width={128} height={128} className="object-cover" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Category Strip */}
      <section className="py-8 bg-peach-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['All', 'Bedding', 'Bathrobes', 'Toiletries', 'Candles', 'Minibar', 'Pillows'].map((cat) => (
              <Link
                key={cat}
                href={`/shop${cat !== 'All' ? `?category=${cat.toLowerCase()}` : ''}`}
                className="px-6 py-2 bg-white hover:bg-orange hover:text-white transition-colors font-ui text-sm whitespace-nowrap"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-peach">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl font-bold text-espresso text-center mb-12"
          >
            Bestsellers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-peach-light overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <Link href={`/shop/${product.slug}`}>
                  <div className="relative h-80">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-ui font-semibold uppercase tracking-wide bg-gold text-espresso">
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="font-ui text-xs text-warm-gray uppercase tracking-wide mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-espresso mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-4">
                      <span className="font-display text-2xl text-orange font-semibold">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product */}
      {featured && (
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[500px]"
              >
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="font-ui text-sm text-orange uppercase tracking-wide mb-2">Featured</p>
                <h3 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
                  {featured.name}
                </h3>
                <p className="font-ui text-warm-gray mt-4 mb-6">{featured.description}</p>
                <p className="font-display text-3xl text-orange mb-6">${featured.price}</p>
                <Link href={`/shop/${featured.slug}`}>
                  <button className="bg-orange text-white px-6 py-3 font-ui font-medium hover:bg-orange-light transition-all">
                    View Product
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Banner */}
      <section className="py-32 bg-espresso text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="font-display text-5xl md:text-7xl italic text-cream mb-8">
            "Sleep like you never left."
          </h2>
          <p className="font-ui text-warm-gray mb-8">
            Discover our curated gift sets and bring the luxury hotel experience home.
          </p>
          <Link href="/shop">
            <button className="border-2 border-cream text-cream px-6 py-3 font-ui font-medium hover:bg-cream hover:text-espresso transition-all">
              Shop Gift Sets
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-5xl font-bold text-espresso text-center mb-12">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', quote: 'These sheets transformed my bedroom into a five-star suite. Worth every penny.', rating: 5 },
              { name: 'James L.', quote: 'The Turkish cotton robe is exactly like the one from my favorite hotel. Amazing quality.', rating: 5 },
              { name: 'Emily R.', quote: 'The candles create such a luxurious atmosphere. I feel like I\'m on vacation every day.', rating: 5 },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="font-ui text-warm-gray mt-4 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-ui font-semibold text-espresso">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
