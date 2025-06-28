import { InvalidSyntaxError } from "src/errors.js";
import { AstNode } from "src/types.js";
import { ExactLiteralNode } from "./exact-literal.js";
import { IdentifierNode } from "./identifier.js";

interface VariableDeclarationNameProps {
  children: [IdentifierNode] | [ExactLiteralNode];
}

export interface VariableDeclarationNameNode extends AstNode {
  type: "variable-declaration-name";
  props: {
    children: [IdentifierNode] | [ExactLiteralNode];
  };
}

export function createVariableDeclarationName(
  props: VariableDeclarationNameProps
): VariableDeclarationNameNode {
  const child = props.children?.[0];

  if (
    props.children.length !== 1 ||
    !child ||
    !["identifier", "exact-literal"].includes(child.type)
  ) {
    throw new InvalidSyntaxError(
      `<variable-declaration-name> must contain exactly one child element of type TODO`
    );
  }

  return {
    type: "variable-declaration-name",
    props: props,
    render: () => props.children[0].render(),
  };
}
