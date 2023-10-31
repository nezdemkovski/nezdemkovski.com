const GithubLogin = () => {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 sm:max-w-md">
      <form
        className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
        action="/api/auth/sign-in-github"
        method="post"
      >
        <button className="border-dotted text-xs text-gray-400">
          Sign In with GitHub
        </button>
      </form>
    </div>
  );
};

export default GithubLogin;
