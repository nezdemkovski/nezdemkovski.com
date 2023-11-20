import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import GithubLogin from '@/components/GithubLogin';
import { createClient } from '@/utils/supabase/server';
import Messages from '@/app/login/messages';

const Login = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <GithubLogin />
      <Messages />
    </div>
  );
};

export default Login;
