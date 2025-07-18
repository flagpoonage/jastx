import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode } from "../types.js";

const type = "var:statement";

export interface VariableStatementProps {
  children: AstNode[] | AstNode;
  exported?: boolean;
}

export interface VariableStatementNode extends AstNode {
  type: typeof type;
  props: VariableStatementProps;
}

export function isVariableStatement(v: AstNode): v is VariableStatementNode {
  return v.type === "var:statement";
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
    render: () => `${props.exported ? "export " : ""}${property_node.render()}`,
  };
}
