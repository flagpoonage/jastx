import Parser from "tree-sitter";
import ts from "tree-sitter-typescript";
import { createSourceFile } from "jastx/build";

const x = new Parser();
x.setLanguage(ts.typescript);

const s = `
import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

const type = "stmt:for-in";

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
  const jastxNode = getJastxNode(n);

  const children = [];

  walker.gotoFirstChild();

  while (walker.currentNode) {
    children.push(parseNode(walker.currentNode, walker));
    walker.gotoNextSibling();
  }

  walker.gotoParent();

  jastxNode.props.children = children;
  return jastxNode;
}

export function getJastxNode(n) {
  switch (n.type) {
    case "program":
      return createSourceFile({ type: "module" });
    default:
      throw new Error(`Unknown tree-sitter node [${n.type}]`);
  }
}

stringToJastx();
