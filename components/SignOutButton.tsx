const SignOutButton = () => {
  return (
    <form action="/api/auth/sign-out" method="post">
      <button className="border-dotted text-xs text-gray-400">Sign out</button>
    </form>
  );
};

export default SignOutButton;
