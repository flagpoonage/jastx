import { assertZeroChildren } from "../asserts.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode } from "../types.js";

const type = "ident";

export interface IdentifierProps {
  name: string;
}

export interface IdentifierNode extends AstNode {
  type: typeof type;
  props: IdentifierProps;
  info: {
    isPrivateIdentifier: boolean
  }
}

export function isPrivateIdentifier (node: AstNode): node is IdentifierNode & { info: { isPrivateIdentifier: true }} {
  return node.type === type && !!node.info?.isPrivateIdentifier;
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
    info: {
      // TODO: Use this later on to error parent components that dont
      // allow private identifiers.
      isPrivateIdentifier: props.name[0] === '#'
    },
    render: () => props.name,
  };
}
