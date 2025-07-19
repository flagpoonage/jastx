import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { ANY_TYPE, AstNode, isTypeType, VALUE_TYPES } from "../types.js";

const type = "param";

export interface ParameterProps {
  children?: any;
}

export interface ParameterNode extends AstNode {
  type: typeof type;
  props: ParameterProps;
}

export function createParameter(props: ParameterProps): ParameterNode {
  const walker = createChildWalker(type, props);

  const p_name = walker.spliceAssertNext([
    "ident",
    "bind:array",
    "bind:object",
  ]);

  if (walker.remainingChildren.length === 0) {
    return {
      type,
      props,
      render: p_name.render,
    };
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
