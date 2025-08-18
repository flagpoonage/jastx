import {
  createIdentifier,
  createImportDeclaration,
  createImportSpecifier,
  createNamedImports,
  createSourceFile,
  createStringLiteral,
} from "jastx/build";

import Parser from "tree-sitter";
import ts from "tree-sitter-typescript";

const x = new Parser();
x.setLanguage(ts.typescript);

const s = `
import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

export { A };

export default a;

export const type = "stmt:for-in";

export interface ForInStatementProps {
  children: AstNode[] | AstNode;
  variableType?: "const" | "let" | "var";
}

export interface ForInStatementNode extends AstNode {
  type: typeof type;
  props: ForInStatementProps;
}

export function isForInStatement(v: AstNode): v is ForInStatementNode {
  return v.type === "stmt:for-in";
}

export function createForInStatement(
  props: ForInStatementProps
): ForInStatementNode {
  assertNChildren(type, 3, props);

  const { variableType = "const" } = props;

  const walker = createChildWalker(type, props);

  const [ident, iterable, block] = walker.spliceAssertExactPath(
    [
      "ident",
      ["ident", "l:object", "l:array", "arrow-function", ...EXPRESSION_TYPES],
      ["block", ...STATEMENT_TYPES],
    ],
    { noTrailing: true }
  );

  assertValue(ident);
  assertValue(iterable);
  assertValue(block);

  return {
    type: type,
    props,
    render: () =>
      \`for(\${variableType} \${ident.render()} in \${iterable.render()})\${block.render()}\`,
  };
}`;

export function stringToJastx() {
  const parser = x.parse(s);
  const walker = parser.walk();
  const tree = parser.rootNode;

  console.log("X", tree.toString());

  const b = parseNode(tree, walker);

  console.log("OUTPUT", b.render());
}
/**
 *
 * @param {Parser.SyntaxNode} n
 * @param {Parser.TreeCursor} walker
 */
export function parseNode(n, walker) {
  console.log;
  const jastxNode = getJastxNode(n, walker);

  if (typeof jastxNode !== "function") {
    return jastxNode;
  }

  const children = [];

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

function passthrough(children) {
  return children;
}

/**
 *
 * @param {Parser.SyntaxNode} n
 * @param {Parser.TreeCursor} walker
 * @returns
 */
export function getJastxNode(n, walker) {
  switch (n.type) {
    case "program":
      return (children) => createSourceFile({ type: "module", children });
    case "import_statement":
      return parseImportStatement(n, walker);
    case "import_clause":
      return passthrough;
    case "named_imports":
      return (children) => createNamedImports({ children });
    case "import_specifier":
      return parseImportSpecifier(n, walker);
    case "identifier":
      return () => createIdentifier({ name: n.text });
    case "string": {
      return parseString(n, walker);
    }
    case "export_statement":
      return parseExportStatement(n, walker);
    default: {
      console.log(n, n.toString(), n);
      throw new Error(`Unknown tree-sitter node [${n.type}]`);
    }
  }
}

function listUnnamedNodes(n) {
  const unnamed_nodes = n.children.filter((a) => !a.isNamed);
  console.log(
    "Unnamed nodes in",
    n.type,
    `\n`,
    ...unnamed_nodes.map((a) => `- ${a.type}`)
  );

  return unnamed_nodes;
}

/**
 *
 * @param {Parser.SyntaxNode} n
 * @param {Parser.TreeCursor} walker
 */
function parseExportStatement(n, walker) {
  listUnnamedNodes(n);

  // Export statements are general in tree-sitter, but
  // are spread across different nodes later on.
  return (children) => {
    if (children.length !== 1) {
      throw new Error(
        "Unexpected number of children for [export_statement]",
        n.toString()
      );
    }
  };
}

/**
 *
 * @param {Parser.SyntaxNode} n
 * @param {Parser.TreeCursor} walker
 */
function parseImportSpecifier(n, walker) {
  const unnamed_nodes = listUnnamedNodes(n);

  return (children) =>
    createImportSpecifier({
      typeOnly: !!unnamed_nodes.find((a) => a.type === "type"),
      children,
    });
}

/**
 *
 * @param {Parser.SyntaxNode} n
 * @param {Parser.TreeCursor} walker
 */
function parseString(n, walker) {
  if (walker.currentNode.namedChildren.length !== 1) {
    throw new Error(
      `Unexpected child count on string node [${walker.currentNode.namedChildren.length}]`
    );
  }

  const c_node = walker.currentNode.namedChildren[0];

  if (c_node.type !== "string_fragment") {
    throw new Error(`Unexpected child node [${c_node.type}] in string`);
  }

  return createStringLiteral({ value: c_node.text });
}

function parseImportStatement(n) {
  const type_only_import = !!n.children.find(
    (a) => !a.isNamed && a.type === "type"
  );

  return (children) =>
    createImportDeclaration({ typeOnly: type_only_import, children });
}

stringToJastx();
