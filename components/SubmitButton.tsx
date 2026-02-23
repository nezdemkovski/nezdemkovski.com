'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  label: string;
  className?: string;
}

const SubmitButton = ({ label, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className={cn('mt-4 font-unbounded font-bold', className)}
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {label}
    </Button>
  );
};

export default SubmitButton;
