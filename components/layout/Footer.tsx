import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-espresso text-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">HOTEL LIFE</h3>
            <p className="font-ui text-sm text-warm-gray">
              Bringing luxury hotel experiences to your home.
            </p>
          </div>

          <div>
            <h4 className="font-ui font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 font-ui text-sm">
              <li><Link href="/shop?category=bedding" className="hover:text-orange transition-colors">Bedding</Link></li>
              <li><Link href="/shop?category=bathrobes" className="hover:text-orange transition-colors">Bathrobes</Link></li>
              <li><Link href="/shop?category=toiletries" className="hover:text-orange transition-colors">Toiletries</Link></li>
              <li><Link href="/shop?category=candles" className="hover:text-orange transition-colors">Candles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold mb-4">Company</h4>
            <ul className="space-y-2 font-ui text-sm">
              <li><Link href="/about" className="hover:text-orange transition-colors">About Us</Link></li>
              <li><Link href="/about#contact" className="hover:text-orange transition-colors">Contact</Link></li>
              <li><Link href="/about#faq" className="hover:text-orange transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-ui font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange transition-colors">Instagram</a>
              <a href="#" className="hover:text-orange transition-colors">Facebook</a>
              <a href="#" className="hover:text-orange transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-gray text-center font-ui text-sm text-warm-gray">
          <p>&copy; 2024 Hotel Life. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
