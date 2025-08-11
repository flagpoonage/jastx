import { assertMaxChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "stmt:return";

export interface ReturnStatementProps {
  children?: any;
}

export interface ReturnStatementNode extends AstNode {
  type: typeof type;
  props: ReturnStatementProps;
}

export function createReturnStatement(
  props: ReturnStatementProps
): ReturnStatementNode {
  assertMaxChildren(type, 1, props);
  const walker = createChildWalker(type, props);

  const return_node = walker.spliceAssertNextOptional([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  return {
    type,
    props,
    render: () => `return${return_node ? ` ${return_node?.render()}` : ""}`,
  };
}
