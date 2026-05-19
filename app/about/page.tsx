'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { Award, Leaf, Shield, RotateCcw } from 'lucide-react';

export default function AboutPage() {
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Message sent successfully');
  };

  return (
    <div className="min-h-screen bg-peach">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/about1/1920/1080"
            alt="About us"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-espresso/60" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 font-display text-6xl md:text-7xl font-bold text-white text-center"
        >
          The Art of the Hotel Stay
        </motion.h1>
      </section>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-5xl italic text-espresso mb-6">
                "We believe luxury should be lived, not just visited."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-ui text-warm-gray mb-4">
                Hotel Life was born from a simple question: Why should the luxury of a five-star hotel stay end when you check out?
              </p>
              <p className="font-ui text-warm-gray mb-4">
                We partner with the world's finest hotels to bring you the same products that make their rooms unforgettable. From Egyptian cotton sheets to handcrafted candles, every item is sourced with care and tested for quality.
              </p>
              <p className="font-ui text-warm-gray">
                Our mission is to help you create a sanctuary at home—a place where every day feels like a getaway.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-peach">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-5xl font-bold text-espresso text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Handcrafted', desc: 'Every product is made with care and attention to detail' },
              { icon: Leaf, title: 'Sustainably Sourced', desc: 'We prioritize eco-friendly materials and ethical practices' },
              { icon: Shield, title: 'Hotel Certified', desc: 'Trusted by luxury hotels worldwide' },
              { icon: RotateCcw, title: 'Free Returns', desc: '30-day return policy on all products' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-peach-light p-8 text-center"
              >
                <value.icon size={48} className="mx-auto text-orange mb-4" />
                <h3 className="font-display text-xl font-bold text-espresso mb-2">{value.title}</h3>
                <p className="font-ui text-sm text-warm-gray">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-5xl font-bold text-espresso text-center mb-12">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">
            <Input label="Name" required />
            <Input label="Email" type="email" required />
            <div>
              <label className="block text-sm font-ui font-medium text-espresso mb-1">Subject</label>
              <select className="w-full px-4 py-2 font-ui border border-warm-gray bg-white">
                <option>General Inquiry</option>
                <option>Product Question</option>
                <option>Order Support</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-ui font-medium text-espresso mb-1">Message</label>
              <textarea
                rows={6}
                required
                className="w-full px-4 py-2 font-ui border border-warm-gray bg-white focus:outline-none focus:border-orange"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-peach">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-5xl font-bold text-espresso text-center mb-12">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all products. Items must be unused and in original packaging.' },
              { q: 'Are your products really hotel-grade?', a: 'Absolutely. We partner directly with luxury hotels and their suppliers to source authentic products.' },
              { q: 'How long does shipping take?', a: 'Domestic orders typically arrive within 3-5 business days. International orders take 7-14 days.' },
              { q: 'Do you offer gift wrapping?', a: 'Yes! Select gift wrapping at checkout for a small additional fee.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-peach-light p-6"
              >
                <h3 className="font-ui font-semibold text-espresso mb-2">{faq.q}</h3>
                <p className="font-ui text-warm-gray">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
