import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import type { AstNode } from "../types.js";
import { EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

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

  const { variableType } = props;

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
      `for(${
        variableType ? `${variableType} ` : ""
      }${ident.render()} in ${iterable.render()})${block.render()}`,
  };
}
