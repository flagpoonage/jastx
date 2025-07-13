import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";
import { createTextNode } from "./text-node.js";

const type = "var:declaration";

export interface VariableDeclarationProps {
  children?: any;
  identifier?: string;
  type?: string;
}

export interface VariableDeclarationNode extends AstNode {
  type: typeof type;
  props: VariableDeclarationProps;
}

export function createVariableDeclaration(
  props: VariableDeclarationProps
): VariableDeclarationNode {
  const walker = createChildWalker(type, props);

  const p_name = walker.spliceAssertSingleOptional([
    "ident",
    "bind:array",
    "bind:object",
  ]);

  const p_type = walker.spliceAssertSingleOptional([...TYPE_TYPES]);

  if (props.identifier && p_name) {
    throw new InvalidSyntaxError(
      `<${type}> cannot specify a literal identifier and a <p:var-name> child`
    );
  }

  const name_node =
    p_name ??
    (props.identifier ? createTextNode({ value: props.identifier }) : null);

  if (!name_node) {
    throw new InvalidSyntaxError(
      `<${type}> expected a identifier attribute, or a <p:var-name> child`
    );
  }

  if (props.type && p_type) {
    throw new InvalidSyntaxError(
      `<${type}> cannot specify a literal identifier and a <p:var-name> child`
    );
  }

  const type_node =
    p_type ?? (props.type ? createTextNode({ value: props.type }) : null);

  if (walker.remainingChildren.length > 1) {
    throw new InvalidSyntaxError(
      `<${type}> cannot have multiple initializer expressions: ${walker.remainingChildren.map(
        (a) => (a.type ? `<${a.type}>` : String(a))
      )}`
    );
  }

  const init = walker.remainingChildren[0];

  return {
    type,
    props,
    render: () => {
      return `${name_node.render()}${
        type_node ? `:${type_node.render()}` : ""
      }${init ? `=${init.render()}` : ""}`;
    },
  };
}
