'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SignOutButton = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button className="border-dotted text-xs text-gray-400" onClick={signOut}>
      Sign out
    </button>
  );
};

export default SignOutButton;
