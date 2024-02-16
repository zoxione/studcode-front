import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2">{children}</h3>,
    ul: ({ children }) => <ul className="space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="space-y-4">{children}</ol>,
    // li: ({ children }) => <li className="space-y-2">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        className="p-px underline decoration-2 decoration-primary transition-colors hover:bg-primary hover:text-background rounded-t-md"
      >
        {children}
      </a>
    ),
    hr: () => <hr className="border-border my-4" />,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-border pl-2">{children}</blockquote>,
    ...components,
  }
}
