import type { SyntaxNode } from "tree-sitter";
import { createImportSpecifier } from "../../../jastx/dist/builders/imports.js";
import type { AstNode } from "../../../jastx/dist/types.js";
import { listUnnamedNodes } from "../util.js";

export function parseImportSpecifier(n: SyntaxNode) {
  const unnamed_nodes = listUnnamedNodes(n);

  return (children: AstNode[]) =>
    createImportSpecifier({
      typeOnly: !!unnamed_nodes.find((a) => a.type === "type"),
      children,
    });
}
