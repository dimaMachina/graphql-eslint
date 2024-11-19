import { ComponentProps, forwardRef } from 'react';
import { clsx } from 'clsx';

export const Button = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        '!bg-white text-gray-700 hover:!bg-gray-50 dark:!bg-gray-800 dark:text-gray-100 dark:hover:!bg-gray-900',
        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75',
        // Register all radix states
        'group',
        'radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900',
        'radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900',
        'radix-state-delayed-open:bg-gray-50 radix-state-instant-open:bg-gray-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
