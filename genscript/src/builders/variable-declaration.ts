import { assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode } from "../types.js";
import { stringRenderer } from "../utils.js";

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

  const p_type = walker.spliceAssertSingleOptional("p:type");
  const p_name = walker.spliceAssertSingleOptional("p:var-name");

  if (props.identifier && p_name) {
    throw new InvalidSyntaxError(
      `<variable-declaration> cannot specify a literal identifier and a <p:var-name> child`
    );
  }

  const name_node =
    p_name ?? (props.identifier ? stringRenderer(props.identifier) : null);

  if (!name_node) {
    throw new InvalidSyntaxError(
      `<variable-declaration> expected a identifier attribute, or a <p:var-name> child`
    );
  }

  if (props.type && p_type) {
    throw new InvalidSyntaxError(
      `<variable-declaration> cannot specify a literal identifier and a <p:var-name> child`
    );
  }

  const type_node = p_type ?? (props.type ? stringRenderer(props.type) : null);

  if (walker.remainingChildren.length > 1) {
    throw new InvalidSyntaxError(
      `<variable-declaration> cannot have multiple initializer expressions: ${walker.remainingChildren.map(
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
