'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$124,563', change: '+12.5%', up: true, icon: DollarSign },
    { label: 'Orders Today', value: '47', change: '+8.2%', up: true, icon: ShoppingCart },
    { label: 'Active Products', value: '24', change: '0%', up: true, icon: Package },
    { label: 'Total Customers', value: '1,284', change: '+5.3%', up: true, icon: Users },
  ];

  const recentOrders = [
    { id: 'HL12345678', customer: 'Sarah Johnson', total: 425, status: 'Processing' },
    { id: 'HL12345679', customer: 'Michael Chen', total: 165, status: 'Shipped' },
    { id: 'HL12345680', customer: 'Emma Davis', total: 289, status: 'Delivered' },
    { id: 'HL12345681', customer: 'James Wilson', total: 520, status: 'Processing' },
    { id: 'HL12345682', customer: 'Olivia Brown', total: 195, status: 'Shipped' },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl font-bold text-gold mb-8"
      >
        Dashboard
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#1E1410] p-6 border border-gold/20"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={24} className="text-gold" />
              <div className={`flex items-center gap-1 text-sm font-ui ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </div>
            </div>
            <p className="font-ui text-sm text-warm-gray mb-1">{stat.label}</p>
            <p className="font-display text-3xl font-bold text-cream">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1E1410] p-6 border border-gold/20"
      >
        <h2 className="font-display text-2xl font-bold text-gold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-3 px-4 font-ui text-sm text-warm-gray">Order ID</th>
                <th className="text-left py-3 px-4 font-ui text-sm text-warm-gray">Customer</th>
                <th className="text-left py-3 px-4 font-ui text-sm text-warm-gray">Total</th>
                <th className="text-left py-3 px-4 font-ui text-sm text-warm-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                  <td className="py-3 px-4 font-ui text-cream">{order.id}</td>
                  <td className="py-3 px-4 font-ui text-cream">{order.customer}</td>
                  <td className="py-3 px-4 font-ui text-cream">${order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 text-xs font-ui font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-900/30 text-green-400' :
                      order.status === 'Shipped' ? 'bg-blue-900/30 text-blue-400' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Low Stock Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-[#1E1410] p-6 border border-orange/30"
      >
        <h3 className="font-ui font-semibold text-orange mb-4">Low Stock Alert</h3>
        <div className="space-y-2">
          <div className="flex justify-between font-ui text-sm">
            <span className="text-cream">Silk Duvet Cover</span>
            <span className="text-orange">28 units</span>
          </div>
          <div className="flex justify-between font-ui text-sm">
            <span className="text-cream">Silk Kimono Robe</span>
            <span className="text-orange">34 units</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
