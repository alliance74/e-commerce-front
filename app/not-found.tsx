'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-peach flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h1 className="font-display text-9xl font-bold text-espresso mb-4">404</h1>
        <h2 className="font-display text-3xl font-semibold text-espresso mb-4">Page Not Found</h2>
        <p className="font-ui text-warm-gray mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary" className="flex items-center gap-2 mx-auto">
            <Home size={20} />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
