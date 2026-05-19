'use client';

import { motion } from 'framer-motion';

export default function AdminAnalyticsPage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl font-bold text-gold mb-8"
      >
        Analytics
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1410] border border-gold/20 p-8 text-center"
      >
        <p className="font-ui text-warm-gray">
          Analytics charts would be implemented here using Recharts library.
        </p>
        <p className="font-ui text-warm-gray mt-2">
          Revenue trends, category performance, and customer acquisition metrics.
        </p>
      </motion.div>
    </div>
  );
}
