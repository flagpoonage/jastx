import { createStringLiteral } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";

export function parseString(n: SyntaxNode) {
  if (n.namedChildren.length !== 1) {
    throw new Error(
      `Unexpected child count on string node [${n.namedChildren.length}]`
    );
  }

  const c_node = n.namedChildren[0];

  if (c_node.type !== "string_fragment") {
    throw new Error(`Unexpected child node [${c_node.type}] in string`);
  }

  return createStringLiteral({ value: c_node.text });
}
