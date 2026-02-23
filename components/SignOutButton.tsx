import { Button } from '@/components/ui/button';

const SignOutButton = () => {
  return (
    <form action="/api/auth/sign-out" method="post">
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="border border-dotted border-white/10 text-xs text-gray-400 hover:text-gray-300"
      >
        Sign out
      </Button>
    </form>
  );
};

export default SignOutButton;
