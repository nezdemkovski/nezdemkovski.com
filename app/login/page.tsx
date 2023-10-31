import Messages from './messages';

export default function Login() {
  return (
    <div className='flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md'>
      <form
        className='flex w-full flex-1 flex-col justify-center gap-2 text-foreground'
        action='/api/auth/sign-in-github'
        method='post'
      >
        <button className='mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground'>
          Sign In with GitHub
        </button>
        <Messages />
      </form>
    </div>
  );
}
