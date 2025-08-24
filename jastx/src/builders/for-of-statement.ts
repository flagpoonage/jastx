import { assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import type { AstNode } from "../types.js";
import { EXPRESSION_TYPES, STATEMENT_TYPES } from "../types.js";

const type = "stmt:for-of";

export interface ForOfStatementProps {
  children: AstNode[] | AstNode;
  await?: boolean;
  variableType?: "const" | "let" | "var";
}

export interface ForOfStatementNode extends AstNode {
  type: typeof type;
  props: ForOfStatementProps;
}

export function isForOfStatement(v: AstNode): v is ForOfStatementNode {
  return v.type === "stmt:for-of";
}

export function createForOfStatement(
  props: ForOfStatementProps
): ForOfStatementNode {
  assertNChildren(type, 3, props);

  const { await: _await = false, variableType } = props;

  const walker = createChildWalker(type, props);

  const [ident, iterable, block] = walker.spliceAssertExactPath(
    [
      "ident",
      ["ident", "l:string", "l:object", "l:array", ...EXPRESSION_TYPES],
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
      `for${_await ? ` await` : ""}(${
        variableType ? `${variableType} ` : ""
      }${ident.render()} of ${iterable.render()})${block.render()}`,
  };
}
