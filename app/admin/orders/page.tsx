'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export default function AdminOrdersPage() {
  const orders = [
    { id: 'HL12345678', customer: 'Sarah Johnson', date: '2024-03-15', items: 3, total: 425, status: 'Processing' },
    { id: 'HL12345679', customer: 'Michael Chen', date: '2024-03-15', items: 1, total: 165, status: 'Shipped' },
    { id: 'HL12345680', customer: 'Emma Davis', date: '2024-03-14', items: 2, total: 289, status: 'Delivered' },
    { id: 'HL12345681', customer: 'James Wilson', date: '2024-03-14', items: 4, total: 520, status: 'Processing' },
    { id: 'HL12345682', customer: 'Olivia Brown', date: '2024-03-13', items: 2, total: 195, status: 'Shipped' },
    { id: 'HL12345683', customer: 'William Taylor', date: '2024-03-13', items: 1, total: 85, status: 'Delivered' },
    { id: 'HL12345684', customer: 'Sophia Martinez', date: '2024-03-12', items: 3, total: 345, status: 'Cancelled' },
    { id: 'HL12345685', customer: 'Liam Anderson', date: '2024-03-12', items: 2, total: 275, status: 'Delivered' },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl font-bold text-gold mb-8"
      >
        Orders
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
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Order ID</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Customer</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Date</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Items</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Total</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors cursor-pointer">
                  <td className="py-3 px-4 font-ui text-cream">{order.id}</td>
                  <td className="py-3 px-4 font-ui text-cream">{order.customer}</td>
                  <td className="py-3 px-4 font-ui text-cream">{order.date}</td>
                  <td className="py-3 px-4 font-ui text-cream">{order.items}</td>
                  <td className="py-3 px-4 font-ui text-cream">${order.total}</td>
                  <td className="py-3 px-4">
                    <select
                      defaultValue={order.status}
                      className="bg-transparent border border-gold/30 text-cream px-3 py-1 text-sm font-ui"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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
