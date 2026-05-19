'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function AdminCustomersPage() {
  const customers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', joined: '2024-01-15', orders: 12, spent: 2450, status: 'Active' },
    { id: '2', name: 'Michael Chen', email: 'michael.c@email.com', joined: '2024-02-03', orders: 8, spent: 1680, status: 'Active' },
    { id: '3', name: 'Emma Davis', email: 'emma.d@email.com', joined: '2024-01-28', orders: 15, spent: 3200, status: 'Active' },
    { id: '4', name: 'James Wilson', email: 'james.w@email.com', joined: '2024-03-10', orders: 3, spent: 890, status: 'Active' },
    { id: '5', name: 'Olivia Brown', email: 'olivia.b@email.com', joined: '2024-02-14', orders: 10, spent: 2100, status: 'Active' },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl font-bold text-gold mb-8"
      >
        Customers
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1410] border border-gold/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Name</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Email</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Joined</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Orders</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Total Spent</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                  <td className="py-3 px-4 font-ui text-cream">{customer.name}</td>
                  <td className="py-3 px-4 font-ui text-cream">{customer.email}</td>
                  <td className="py-3 px-4 font-ui text-cream">{customer.joined}</td>
                  <td className="py-3 px-4 font-ui text-cream">{customer.orders}</td>
                  <td className="py-3 px-4 font-ui text-cream">${customer.spent}</td>
                  <td className="py-3 px-4">
                    <Badge variant="gold">{customer.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
