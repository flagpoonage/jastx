import { assertMaxChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import {
  AstNode,
  EXPRESSION_OR_LITERAL_TYPES,
  STATEMENT_TYPES,
} from "../types.js";

const type = "stmt:while";

export interface WhileStatementProps {
  children: any;
}

export interface WhileStatementNode extends AstNode {
  type: typeof type;
  props: WhileStatementProps;
}

export function isWhileStatement(v: AstNode): v is WhileStatementNode {
  return v.type === "stmt:while";
}

export function createWhileStatement(
  props: WhileStatementProps
): WhileStatementNode {
  assertMaxChildren(type, 2, props);

  const walker = createChildWalker(type, props);

  const [condition, block] = walker.spliceAssertExactPath([
    ["ident", ...EXPRESSION_OR_LITERAL_TYPES],
    ["block", ...STATEMENT_TYPES],
  ]);

  assertValue(condition);
  assertValue(block);

  return {
    type: type,
    props,
    render: () => `while(${condition.render()})${block.render()}`,
  };
}
