import type { SyntaxNode, TreeCursor } from "tree-sitter";
import Parser from "tree-sitter";
import ts from "tree-sitter-typescript";
import type { AstNode } from "../../jastx/dist/types";
import { parseExportStatement } from "./parsers/export_statement";
import { parseIdentifier } from "./parsers/identifier";
import { parseImportSpecifier } from "./parsers/import_specifier";
import { parseImportStatement } from "./parsers/import_statement";
import { parseNamedImports } from "./parsers/named_imports";
import { parseProgram } from "./parsers/program";
import { parseString } from "./parsers/string";
import { passthrough } from "./util";

const x = new Parser();
// @ts-expect-error The tree-sitter types are incorrect
x.setLanguage(ts.typescript);

export function stringToJastx(s: string) {
  const parser = x.parse(s);
  const walker = parser.walk();
  const tree = parser.rootNode;

  console.log("X", tree.toString());

  const b = parseNode(tree, walker);

  console.log("OUTPUT", b.render());
}

export function parseNode(n: SyntaxNode, walker: TreeCursor) {
  const jastxNode = getJastxNode(n);

  if (typeof jastxNode !== "function") {
    return jastxNode;
  }

  const children: AstNode[] = [];

  if (!walker.gotoFirstChild()) {
    return jastxNode(children);
  }

  let has_next_node = true;

  while (has_next_node) {
    if (!walker.currentNode.isNamed) {
      // TODO: Might need these...
      has_next_node = walker.gotoNextSibling();
      continue;
    }

    const nodes = parseNode(walker.currentNode, walker);

    console.log(
      Array.isArray(nodes) ? nodes.map((a) => a.render()) : nodes.render()
    );

    children.push(...(Array.isArray(nodes) ? nodes : [nodes]));
    has_next_node = walker.gotoNextSibling();
  }

  walker.gotoParent();

  return jastxNode(children);
}

export function getJastxNode(
  n: SyntaxNode
): AstNode | ((children: AstNode[]) => AstNode) {
  switch (n.type) {
    case "program":
      return parseProgram();
    case "import_statement":
      return parseImportStatement(n);
    case "import_clause":
      return passthrough;
    case "named_imports":
      return parseNamedImports();
    case "import_specifier":
      return parseImportSpecifier(n);
    case "identifier":
      return parseIdentifier(n);
    case "string":
      return parseString(n);
    case "export_statement":
      return parseExportStatement(n);
    default: {
      console.log(n, n.toString());
      throw new Error(`Unknown tree-sitter node [${n.type}]`);
    }
  }
}
