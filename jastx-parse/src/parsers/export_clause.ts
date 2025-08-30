import { createNamedExports } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import type { AstNode } from "../../../jastx/dist/types.js";

export function parseExportClause(n: SyntaxNode) {
  const has_specifier = n.namedChildren.find(
    (a) => a.type === "export_specifier"
  );

  if (has_specifier) {
    return (children: AstNode[]) => createNamedExports({ children });
  }

  return (children: AstNode[]) => children;
}
