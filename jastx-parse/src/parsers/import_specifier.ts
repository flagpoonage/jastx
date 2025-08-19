import type { SyntaxNode } from "tree-sitter";
import { createImportSpecifier } from "../../../jastx/dist/builders/imports";
import { listUnnamedNodes } from "../util";

export function parseImportSpecifier(n: SyntaxNode) {
  const unnamed_nodes = listUnnamedNodes(n);

  return (children) =>
    createImportSpecifier({
      typeOnly: !!unnamed_nodes.find((a) => a.type === "type"),
      children,
    });
}
