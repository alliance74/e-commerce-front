import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'orange' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-gold text-espresso',
    orange: 'bg-orange text-white',
    gray: 'bg-warm-gray text-white',
  };

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-ui font-semibold uppercase tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
