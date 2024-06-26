import { Button } from '../ui/button';

type SubmitButtonProps = {
  text: string;
  isSubmitting: boolean;
  className?: string;
  isDisabled?: boolean
};

export default function SubmitButton({ isSubmitting, text, className, isDisabled }: SubmitButtonProps) {
  return (
    <Button type='submit' className={`w-4/6 ${className}`} disabled={isDisabled}>
      <div className='flex-center gap-x-3'>
        <p
          className={`transition-all ${
            isSubmitting ? 'opacity-100 visible mr-0' : 'opacity-0 invisible -mr-7'
          }`}
        >
          <span className='spinner'></span>
        </p>
        <span>{text}</span>
      </div>
    </Button>
  );
}
