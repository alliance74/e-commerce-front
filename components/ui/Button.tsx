import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children: ReactNode;
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-orange text-white hover:bg-orange-light',
    secondary: 'bg-espresso text-white hover:bg-opacity-80',
    ghost: 'border-2 border-espresso text-espresso hover:bg-espresso hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 font-ui font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
