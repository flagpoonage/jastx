import { createIdentifier, createTypeReference } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseTypeIdentifier(n: SyntaxNode) {
  return createTypeReference({
    children: [createIdentifier({ name: n.text })],
  });
}
