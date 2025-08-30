import { createIdentifier } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseIdentifier(n: SyntaxNode) {
  return createIdentifier({ name: n.text });
}
