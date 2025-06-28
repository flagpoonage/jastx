import { AstNode, WithChildren } from "../types.js";
import { getNodeUsage, groupNodesByUsage, hasNone, hasSome } from "../utils.js";

export interface VariableStatementProps {}

export interface VariableStatementNode extends AstNode {
  type: "variable-statement";
  props: VariableStatementProps & {
    children: [Variable];
  };
}

export function createArguments(
  props: WithChildren<ArgumentsProps>
): ArgumentsNode {
  const children = props.children;

  if (!children || hasNone(children)) {
    console.log("NO CHILDREN AVAILABLE FOR ARGUMENTS", children);
    return {
      type: "arguments",
      props,
      render: () => ``,
    };
  }

  const groups = groupNodesByUsage(children);

  if (hasSome(groups.block) || hasSome(groups.statement)) {
    throw new Error(
      `Invalid arguments. Arguments can only be expressions, not blocks or statements`
    );
  }

  const renderable_children = children.filter(
    (a) => a.type === "literal" || getNodeUsage(a) === "expression"
  );

  return {
    type: "arguments",
    props,
    render: () => `${renderable_children.map((a) => a.render()).join(", ")}`,
  };
}
