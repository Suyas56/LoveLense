import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: 'romantic' | 'soft' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'romantic', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      romantic: 'btn-romantic',
      soft: 'btn-soft',
      outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground rounded-full px-6 py-3 transition-all duration-300',
      ghost: 'text-primary hover:bg-accent hover:text-accent-foreground rounded-full px-4 py-2 transition-all duration-300'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          size !== 'md' && sizes[size],
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;