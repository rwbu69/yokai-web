import { marked, type Tokens } from 'marked';

/**
 * Custom Markdown Parser for Yokai Web
 * 
 * Allows embedding raw HTML (like YouTube iframes) by intercepting
 * code blocks with specific languages (e.g. `html` or `embed`).
 * 
 * Usage in CMS:
 * ```html
 * <iframe width="560" height="315" src="..."></iframe>
 * ```
 */

const renderer = {
  code(token: Tokens.Code) {
    // If the language is 'html' or 'embed', render the raw HTML directly
    if (token.lang === 'html' || token.lang === 'embed') {
      return token.text;
    }
    
    // Otherwise, render a standard code block
    return `<pre><code class="language-${token.lang || ''}">${token.text}</code></pre>`;
  }
};

marked.use({ renderer });

export function parseMarkdown(content: string | undefined | null): string {
  if (!content) return '';
  return marked.parse(content) as string;
}
