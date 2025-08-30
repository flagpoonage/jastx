import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import type { AstNode } from "../types.js";
import { EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "stmt:throw";

export interface ThrowStatementProps {
  children?: any;
}

export interface ThrowStatementNode extends AstNode {
  type: typeof type;
  props: ThrowStatementProps;
}

export function createThrowStatement(
  props: ThrowStatementProps
): ThrowStatementNode {
  assertNChildren(type, 1, props);
  const walker = createChildWalker(type, props);

  const return_node = walker.spliceAssertNext([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  return {
    type,
    props,
    render: () => `throw ${return_node?.render()}`,
  };
}
