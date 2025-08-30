import { createExportSpecifier } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import type { AstNode } from "../../../jastx/dist/types.js";
import { listUnnamedNodes } from "../util.js";

export function parseExportSpecifier(n: SyntaxNode) {
  const unnamed_nodes = listUnnamedNodes(n);

  return (children: AstNode[]) =>
    createExportSpecifier({
      typeOnly: !!unnamed_nodes.find((a) => a.type === "type"),
      children,
    });
}
