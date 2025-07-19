import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import {
  ANY_TYPE,
  AstNode,
  EXPRESSION_OR_LITERAL_TYPES,
  isTypeType,
  VALUE_TYPES,
} from "../types.js";

const type = "var:declaration";

export interface VariableDeclarationProps {
  children?: any;
}

export interface VariableDeclarationNode extends AstNode {
  type: typeof type;
  props: VariableDeclarationProps;
}

export function createVariableDeclaration(
  props: VariableDeclarationProps
): VariableDeclarationNode {
  const walker = createChildWalker(type, props);

  const p_name = walker.spliceAssertNext([
    "ident",
    "bind:array",
    "bind:object",
  ]);

  if (walker.remainingChildren.length === 0) {
    if (p_name.type === "ident") {
      return {
        type,
        props,
        render: p_name.render,
      };
    }

    // If it's not an ident, then it will be rendering something like
    // const [a,b];
    // which is not valid, you need an initializer for destructirng.
    throw new InvalidSyntaxError(
      `<${type}> a destructuring declaration must have an initializer`
    );
  }

  const p_type = walker.spliceAssertNext(ANY_TYPE);

  if (!isTypeType(p_type.type)) {
    if (walker.remainingChildren.length > 0) {
      throw new InvalidSyntaxError(
        `<${type}> can only have a single initializer`
      );
    }

    const p_init = p_type;

    return {
      type,
      props,
      render: () => {
        return `${p_name.render()}=${p_init.render()}`;
      },
    };
  }

  if (walker.remainingChildren.length === 0) {
    return {
      type,
      props,
      render: () => `${p_name.render()}:${p_type.render()}`,
    };
  }

  const p_init = walker.spliceAssertNext([...VALUE_TYPES]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidSyntaxError(
      `<${type}> can only have a single initializer`
    );
  }

  return {
    type,
    props,
    render: () => `${p_name.render()}:${p_type.render()}=${p_init.render()}`,
  };
}
