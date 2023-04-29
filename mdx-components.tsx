import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => (
      <p className="text-black dark:text-white">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="font-unbounded text-3xl text-black dark:text-white sm:text-4xl">
        {children}
      </h1>
    ),
    a: ({ children, href, ...props }) => (
      <a href={href} className="text-black dark:text-white" {...props}>
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="text-black dark:text-white">{children}</strong>
    ),
    ...components,
  };
}
