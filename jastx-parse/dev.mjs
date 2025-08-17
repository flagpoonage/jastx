import {
  createIdentifier,
  createImportDeclaration,
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

  return parseNode(tree, walker);
}
/**
 *
 * @param {Parser.SyntaxNode} n
 * @param {Parser.TreeCursor} walker
 */
export function parseNode(n, walker) {
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

    children.push(...(Array.isArray(nodes) ? nodes : [nodes]));
    has_next_node = walker.gotoNextSibling();
  }

  walker.gotoParent();

  return jastxNode(children);
}

/**
 *
 * @param {Parser.SyntaxNode} n
 * @returns
 */
export function getJastxNode(n, walker) {
  switch (n.type) {
    case "program":
      return () => createSourceFile({ type: "module" });
    case "import_statement":
      return (children) => parseImportStatement(n, children);
    case "import":
      return (children) => parseImport(n, children);
    case "import_clause":
      return (children) => children;
    case "named_imports":
      return (children) => createNamedImports({ children });
    case "import_specifier":
      return (children) => children;
    case "identifier":
      return () => createIdentifier({ name: n.text });
    case "string": {
      return parseString(n, walker);
    }
    default: {
      console.log(n, n.toString(), n);
      throw new Error(`Unknown tree-sitter node [${n.type}]`);
    }
  }
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

function parseImportStatement(n, children) {
  return createImportDeclaration({ children });
}

stringToJastx();
