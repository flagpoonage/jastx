import { createExportDefault } from "jastx/build";
import type { SyntaxNode } from "tree-sitter";
import { parseNode } from "../parse";

export function parseExportStatement(node: SyntaxNode) {
  const declaration = node.childForFieldName("declaration");

  if (declaration) {
    // If it's a declaration, then the export will be handled
    // internally, so continue parsing from the declaration
    const subwalker = declaration.walk();
    return parseNode(subwalker.currentNode, subwalker);
  }

  const value = node.childForFieldName("value");

  if (value) {
    // TOOD: This is possible not a default export...
    return (children) => createExportDefault({ children });
  }

  return (children) => createExportDefault({ children });
}
