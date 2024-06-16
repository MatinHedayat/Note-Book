import * as React from 'react';

import { cn } from '@/utils/shadUtils';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, any>(({ className, type, ...props }, ref) => {
  const [inputType, setInputType] = React.useState('password');

  return (
    <>
      {type === 'password' ? (
        <div className={`relative password-${props.typeId}`}>
          <input
            type={inputType}
            className={cn(
              'flex h-12 w-full rounded-md border border-zinc-200 bg-white px-3 pr-16 py-2 text-zinc-900 text-sm font-medium ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
              className
            )}
            ref={ref}
            {...props}
          />

          <button
            type='button'
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 transition-all ${
              inputType === 'password' ? 'text-zinc-500' : 'text-zinc-900'
            }`}
            onClick={() => {
              const passwordInput = document
                .querySelector(`.password-${props.typeId}`)
                ?.querySelector('input');

              passwordInput?.type === 'password' ? setInputType('text') : setInputType('password');
            }}
          >
            {inputType === 'password' ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </button>
        </div>
      ) : (
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-zinc-900 text-sm font-medium ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
            className
          )}
          ref={ref}
          {...props}
        />
      )}
    </>
  );
});
Input.displayName = 'Input';

export { Input };
