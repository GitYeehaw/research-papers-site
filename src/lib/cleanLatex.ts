/**
 * Convert common LaTeX text-mode commands in paper titles/text to HTML.
 * Handles commands that MathJax does NOT process (text-mode, not math-mode).
 * Safe to use with dangerouslySetInnerHTML since source is our own scraped data.
 */
export function cleanLatex(text: string): string {
  return text
    .replace(/\\textsubscript\{([^}]*)}/g, "<sub>$1</sub>")
    .replace(/\\textsuperscript\{([^}]*)}/g, "<sup>$1</sup>")
    .replace(/\\textit\{([^}]*)}/g, "<em>$1</em>")
    .replace(/\\textbf\{([^}]*)}/g, "<strong>$1</strong>")
    .replace(/\\textrm\{([^}]*)}/g, "$1")
    .replace(/\\mathrm\{([^}]*)}/g, "$1")
    .replace(/\\text\{([^}]*)}/g, "$1")
    .replace(/\\emph\{([^}]*)}/g, "<em>$1</em>")
    .replace(/~{}/g, "")
    .replace(/~(?=[\\A-Za-z])/g, " ");
}
