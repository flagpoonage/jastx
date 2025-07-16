import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode } from "../types.js";

const type = "var:statement";

export interface VariableStatementProps {
  children: AstNode[] | AstNode;
}

export interface VariableStatementNode extends AstNode {
  type: typeof type;
  props: VariableStatementProps;
}

export function createVariableStatement(
  props: VariableStatementProps
): VariableStatementNode {
  assertNChildren(type, 1, props);

  const walker = createChildWalker(type, props);

  const property_node = walker.spliceAssertNext(["var:declaration-list"]);

  return {
    type: type,
    props,
    render: property_node.render,
  };
}
