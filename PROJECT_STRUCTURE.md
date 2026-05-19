# Project Structure

```
e-commerce/
│
├── app/                                    # Next.js 14 App Router
│   ├── layout.tsx                         # Root layout with providers & fonts
│   ├── page.tsx                           # Homepage (hero, bestsellers, featured)
│   ├── globals.css                        # Global styles & CSS variables
│   ├── not-found.tsx                      # 404 page
│   │
│   ├── shop/
│   │   ├── page.tsx                       # Product listing with filters
│   │   └── [slug]/
│   │       └── page.tsx                   # Product detail page
│   │
│   ├── cart/
│   │   └── page.tsx                       # Shopping cart
│   │
│   ├── checkout/
│   │   └── page.tsx                       # 2-step checkout flow
│   │
│   ├── auth/
│   │   └── page.tsx                       # Login/Register
│   │
│   ├── profile/
│   │   └── page.tsx                       # User profile & orders
│   │
│   ├── wishlist/
│   │   └── page.tsx                       # Saved products
│   │
│   ├── about/
│   │   └── page.tsx                       # About, contact, FAQ
│   │
│   └── admin/                             # Admin panel (dark theme)
│       ├── layout.tsx                     # Admin layout with sidebar
│       ├── page.tsx                       # Dashboard
│       ├── products/
│       │   └── page.tsx                   # Product management
│       ├── orders/
│       │   └── page.tsx                   # Order management
│       ├── customers/
│       │   └── page.tsx                   # Customer list
│       └── analytics/
│           └── page.tsx                   # Analytics (placeholder)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                     # Main navigation with cart badge
│   │   └── Footer.tsx                     # Site footer
│   │
│   ├── shop/
│   │   └── ProductCard.tsx                # Product card with wishlist
│   │
│   └── ui/                                # Reusable UI components
│       ├── Button.tsx                     # Primary, secondary, ghost, danger
│       ├── Input.tsx                      # Form input with label
│       ├── Badge.tsx                      # Gold, orange, gray badges
│       ├── Toast.tsx                      # Toast notifications
│       ├── Spinner.tsx                    # Loading spinner
│       └── StarRating.tsx                 # Star rating display
│
├── context/                               # React Context providers
│   ├── CartContext.tsx                    # Cart state with useReducer
│   ├── WishlistContext.tsx                # Wishlist state
│   ├── AuthContext.tsx                    # Mock authentication
│   └── ToastContext.tsx                   # Toast notifications
│
├── lib/                                   # Data & utilities
│   ├── products.ts                        # 24 mock products
│   ├── categories.ts                      # Category definitions
│   └── utils.ts                           # formatPrice, slugify, cn()
│
├── public/                                # Static assets (Next.js default)
│
├── tailwind.config.ts                     # Tailwind with custom theme
├── next.config.ts                         # Next.js config (image domains)
├── tsconfig.json                          # TypeScript config
├── package.json                           # Dependencies & scripts
├── README.md                              # Project documentation
├── QUICKSTART.md                          # Quick start guide
└── PROJECT_STRUCTURE.md                   # This file
```

## Key Files Explained

### Core Application

- **`app/layout.tsx`** - Root layout that wraps all pages with providers (Cart, Wishlist, Auth, Toast), fonts (Cormorant Garamond, DM Sans), Navbar, and Footer

- **`app/page.tsx`** - Homepage with cinematic hero, category strip, bestsellers grid, featured product, editorial banner, and testimonials

- **`app/globals.css`** - CSS variables for brand colors, custom scrollbar, utility classes

### Context Providers

- **`CartContext.tsx`** - Shopping cart with useReducer (add, remove, update quantity, clear), localStorage persistence

- **`WishlistContext.tsx`** - Wishlist toggle functionality, localStorage persistence

- **`AuthContext.tsx`** - Mock authentication (login, register, logout), admin check

- **`ToastContext.tsx`** - Global toast notifications (success, error, info)

### Data Layer

- **`lib/products.ts`** - 24 products with full details (id, slug, name, category, price, rating, images, variants, amenities, etc.)

- **`lib/categories.ts`** - Category definitions (bedding, bathrobes, toiletries, candles, minibar, pillows)

- **`lib/utils.ts`** - Helper functions (formatPrice, slugify, cn for className merging)

### UI Components

- **`Button.tsx`** - 4 variants (primary, secondary, ghost, danger) with hover states

- **`Input.tsx`** - Form input with label and error state

- **`Badge.tsx`** - Small labels (gold, orange, gray) for product badges and status

- **`Toast.tsx`** - Animated toast notifications with Framer Motion

- **`StarRating.tsx`** - Star rating display with optional number

### Layout Components

- **`Navbar.tsx`** - Transparent → frosted glass on scroll, cart badge with item count, mobile hamburger menu

- **`Footer.tsx`** - Site footer with links, social icons, newsletter signup

### Page Components

All pages use Framer Motion for animations:
- Initial page load animations
- Scroll-triggered reveals with `whileInView`
- Staggered children animations
- Hover effects on cards and buttons

### Admin Panel

Dark theme with gold accents:
- Sidebar navigation
- Stats cards with trend indicators
- Data tables with inline editing
- Status badges and dropdowns

## Design System

### Colors (Tailwind Extended)
```css
peach:        #F2C4A0   /* Page background */
peach-light:  #FAF7F2   /* Cards, panels */
orange:       #D4621A   /* Primary CTA */
orange-light: #F0874A   /* Hover states */
espresso:     #1C1009   /* Headings */
warm-gray:    #8C7B6E   /* Body text */
cream:        #FDF8F3   /* Alt background */
gold:         #C9A84C   /* Badges, admin */
```

### Typography
- **Display**: Cormorant Garamond (400, 600, 700) - Headings, product names
- **UI**: DM Sans (400, 500, 700) - Body text, buttons, labels

### Animation Patterns
- Page transitions: `opacity 0→1, y: 20→0, duration 0.5s`
- Stagger: `0.08s` delay between children
- Hover: `y: -6px` lift + shadow deepen
- Scroll reveals: `whileInView={{ once: true }}`

## State Management

### Cart State
```typescript
{
  items: [
    {
      product: Product,
      quantity: number,
      selectedVariants: Record<string, string>
    }
  ]
}
```

### Wishlist State
```typescript
{
  items: Product[]
}
```

### Auth State
```typescript
{
  user: {
    id: string,
    name: string,
    email: string,
    isAdmin: boolean
  } | null
}
```

## Data Flow

1. **Product Browsing**: `lib/products.ts` → `shop/page.tsx` → `ProductCard`
2. **Add to Cart**: `ProductCard` → `CartContext.addToCart()` → localStorage
3. **Checkout**: `cart/page.tsx` → `checkout/page.tsx` → `CartContext.clearCart()`
4. **Authentication**: `auth/page.tsx` → `AuthContext.login()` → localStorage
5. **Admin Access**: Check `user.isAdmin` → redirect if false

## Responsive Breakpoints

- **Mobile**: < 768px (1 column, hamburger menu)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns, full navigation)

## Performance Optimizations

- Next.js Image component with lazy loading
- Framer Motion with `viewport: { once: true }` to prevent re-animations
- localStorage for client-side persistence
- Minimal re-renders with Context API
- Static product data (no API calls)

## Future Enhancements

- [ ] Real backend API integration
- [ ] Database (PostgreSQL, MongoDB)
- [ ] Stripe payment integration
- [ ] Product search with Algolia
- [ ] Image upload with Cloudinary
- [ ] Email notifications with SendGrid
- [ ] Real-time inventory updates
- [ ] Product reviews & ratings
- [ ] Advanced analytics with Recharts
- [ ] SEO optimization with metadata
- [ ] Internationalization (i18n)
- [ ] A/B testing framework
