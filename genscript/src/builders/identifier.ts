import { InvalidSyntaxError } from "../errors.js";
import { assertZeroChildren } from "../asserts.js";
import { AstNode } from "../types.js";

const type = "ident";

export interface IdentifierProps {
  name: string;
}

export interface IdentifierNode extends AstNode {
  type: typeof type;
  props: IdentifierProps;
}

export function createIdentifier(props: IdentifierProps): IdentifierNode {
  assertZeroChildren(type, props);

  if (!props.name) {
    throw new InvalidSyntaxError(`An identifier name cannot be empty`);
  }

  if (/[0-9]/.test(props.name[0])) {
    throw new InvalidSyntaxError(
      `An identifier name cannot start with a digit.`
    );
  }

  return {
    type,
    props,
    render: () => props.name,
  };
}
