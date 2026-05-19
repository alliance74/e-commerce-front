'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/context/ToastContext';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully');
    router.push('/');
  };

  const handleSave = () => {
    showToast('Profile updated successfully');
  };

  return (
    <div className="min-h-screen bg-peach py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold text-espresso mb-8"
        >
          My Account
        </motion.h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-peach-light p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-warm-gray">
              <div className="w-16 h-16 rounded-full bg-orange flex items-center justify-center text-white font-display text-2xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-ui font-semibold text-espresso">{user.name}</p>
                <p className="font-ui text-sm text-warm-gray">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-ui transition-colors ${
                  tab === 'profile' ? 'bg-orange text-white' : 'text-warm-gray hover:bg-white'
                }`}
              >
                <User size={20} />
                Profile
              </button>
              <button
                onClick={() => setTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-ui transition-colors ${
                  tab === 'orders' ? 'bg-orange text-white' : 'text-warm-gray hover:bg-white'
                }`}
              >
                <Package size={20} />
                Orders
              </button>
              <button
                onClick={() => router.push('/wishlist')}
                className="w-full flex items-center gap-3 px-4 py-3 font-ui text-warm-gray hover:bg-white transition-colors"
              >
                <Heart size={20} />
                Wishlist
              </button>
              <button
                onClick={() => setTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 font-ui transition-colors ${
                  tab === 'settings' ? 'bg-orange text-white' : 'text-warm-gray hover:bg-white'
                }`}
              >
                <Settings size={20} />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 font-ui text-warm-gray hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 bg-peach-light p-8">
            {tab === 'profile' && (
              <div>
                <h2 className="font-display text-3xl font-bold text-espresso mb-6">Profile Information</h2>
                <div className="space-y-6 max-w-2xl">
                  <Input label="Full Name" defaultValue={user.name} />
                  <Input label="Email" type="email" defaultValue={user.email} />
                  <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                  <Input label="Address" placeholder="123 Main St" />
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h2 className="font-display text-3xl font-bold text-espresso mb-6">Order History</h2>
                <div className="space-y-4">
                  {[
                    { id: 'HL12345678', date: '2024-03-15', items: 3, total: 425, status: 'Delivered' },
                    { id: 'HL12345679', date: '2024-03-10', items: 1, total: 165, status: 'Shipped' },
                    { id: 'HL12345680', date: '2024-03-05', items: 2, total: 289, status: 'Processing' },
                  ].map((order) => (
                    <div key={order.id} className="bg-white p-6 flex items-center justify-between">
                      <div>
                        <p className="font-ui font-semibold text-espresso">Order #{order.id}</p>
                        <p className="font-ui text-sm text-warm-gray">{order.date} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-xl text-orange">${order.total}</p>
                        <span className={`inline-block px-3 py-1 text-xs font-ui font-semibold ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div>
                <h2 className="font-display text-3xl font-bold text-espresso mb-6">Settings</h2>
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="font-ui font-semibold text-espresso mb-3">Notifications</h3>
                    <label className="flex items-center gap-3 mb-2">
                      <input type="checkbox" defaultChecked />
                      <span className="font-ui text-warm-gray">Email notifications</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked />
                      <span className="font-ui text-warm-gray">Order updates</span>
                    </label>
                  </div>
                  <div>
                    <h3 className="font-ui font-semibold text-espresso mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" />
                      <Input label="New Password" type="password" />
                      <Input label="Confirm New Password" type="password" />
                      <Button variant="primary">Update Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
