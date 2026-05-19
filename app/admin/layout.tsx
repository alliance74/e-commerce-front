'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#0F0A07] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E1410] border-r border-gold/20 fixed h-full">
        <div className="p-6">
          <h2 className="font-display text-2xl font-bold text-gold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors font-ui"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors font-ui"
            >
              <Package size={20} />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors font-ui"
            >
              <ShoppingCart size={20} />
              Orders
            </Link>
            <Link
              href="/admin/customers"
              className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors font-ui"
            >
              <Users size={20} />
              Customers
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors font-ui"
            >
              <BarChart3 size={20} />
              Analytics
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-warm-gray hover:text-cream transition-colors font-ui mt-8"
            >
              <ArrowLeft size={20} />
              Back to Store
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
