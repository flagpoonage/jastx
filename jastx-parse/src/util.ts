import type { SyntaxNode } from "tree-sitter";
import type { AstNode } from "../../jastx/dist/types.js";

export function passthrough(children: AstNode[]) {
  return children;
}

export function listUnnamedNodes(n: SyntaxNode) {
  const unnamed_nodes = n.children.filter((a) => !a.isNamed);
  console.log(
    "Unnamed nodes in",
    n.type,
    `\n`,
    ...unnamed_nodes.map((a) => `- ${a.type}`)
  );

  return unnamed_nodes;
}
