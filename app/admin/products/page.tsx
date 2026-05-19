'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-gold"
        >
          Products
        </motion.h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={20} />
          Add Product
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E1410] border border-gold/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Image</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Name</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Category</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Price</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Stock</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Status</th>
                <th className="text-left py-4 px-4 font-ui text-sm text-warm-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-ui text-cream">{product.name}</td>
                  <td className="py-3 px-4 font-ui text-cream capitalize">{product.category}</td>
                  <td className="py-3 px-4 font-ui text-cream">${product.price}</td>
                  <td className="py-3 px-4 font-ui text-cream">{product.stock}</td>
                  <td className="py-3 px-4">
                    <Badge variant={product.stock > 50 ? 'gold' : 'orange'}>
                      {product.stock > 50 ? 'In Stock' : 'Low Stock'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gold hover:bg-gold/20 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-500/20 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
