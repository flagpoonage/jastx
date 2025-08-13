import { assertMaxChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const type = "stmt:do-while";

export interface DoWhileStatementProps {
  children: any;
}

export interface DoWhileStatementNode extends AstNode {
  type: typeof type;
  props: DoWhileStatementProps;
}

export function isDoWhileStatement(v: AstNode): v is DoWhileStatementNode {
  return v.type === "stmt:do-while";
}

export function createDoWhileStatement(
  props: DoWhileStatementProps
): DoWhileStatementNode {
  assertMaxChildren(type, 2, props);

  const walker = createChildWalker(type, props);

  const [block, condition] = walker.spliceAssertExactPath([
    "block",
    ["ident", ...EXPRESSION_OR_LITERAL_TYPES],
  ]);

  assertValue(block);
  assertValue(condition);

  return {
    type: type,
    props,
    render: () => `do${block.render()}while(${condition.render()})`,
  };
}
