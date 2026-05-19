'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { formatPrice } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shipping = subtotal > 150 ? 0 : 12;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    country: 'United States',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOrderNumber(`HL${Date.now().toString().slice(-8)}`);
      clearCart();
      setStep(3);
      setLoading(false);
    }
  };

  if (state.items.length === 0 && step !== 3) {
    router.push('/cart');
    return null;
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-peach flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-espresso mb-4">Order Confirmed!</h2>
          <p className="font-ui text-warm-gray mb-2">Order Number: <strong>{orderNumber}</strong></p>
          <p className="font-ui text-warm-gray mb-8">
            Thank you for your purchase. A confirmation email has been sent.
          </p>
          <Button variant="primary" onClick={() => router.push('/shop')} className="w-full">
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peach py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-bold text-espresso mb-8"
        >
          Checkout
        </motion.h1>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-ui font-semibold ${
                  step >= s ? 'bg-orange text-white' : 'bg-warm-gray text-white'
                }`}
              >
                {s}
              </div>
              {s < 2 && <div className={`w-24 h-1 ${step > s ? 'bg-orange' : 'bg-warm-gray'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-peach-light p-8 space-y-6">
              {step === 1 && (
                <>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">Shipping Information</h2>
                  <Input
                    label="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Address Line 1"
                    required
                    value={formData.address1}
                    onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                  />
                  <Input
                    label="Address Line 2"
                    value={formData.address2}
                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    <Input
                      label="Country"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    <Input
                      label="ZIP Code"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">Payment Information</h2>
                  <p className="font-ui text-sm text-orange mb-4">
                    This is a demo — no real payment is processed.
                  </p>
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      label="Expiry (MM/YY)"
                      placeholder="12/25"
                      required
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    />
                    <Input
                      label="Cardholder Name"
                      required
                      value={formData.cardHolder}
                      onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4">
                {step > 1 && (
                  <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                  {loading ? <Spinner /> : step === 2 ? 'Place Order' : 'Continue'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-peach-light p-6 h-fit">
            <h2 className="font-display text-2xl font-bold text-espresso mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex justify-between font-ui text-sm">
                  <span className="text-warm-gray">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-espresso">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 font-ui text-warm-gray border-t border-warm-gray pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-display text-xl text-espresso font-bold pt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
