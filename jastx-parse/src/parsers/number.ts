import { createBigintLiteral, createNumberLiteral } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseNumber(n: SyntaxNode) {
  if (n.text.endsWith("n")) {
    return createBigintLiteral({ value: BigInt(n.text.slice(0, -1)) });
  } else {
    return createNumberLiteral({ value: Number(n.text) });
  }
}
