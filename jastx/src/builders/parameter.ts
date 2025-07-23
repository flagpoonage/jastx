import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { ANY_TYPE, AstNode, isTypeType, VALUE_TYPES } from "../types.js";

const type = "param";

export interface ParameterProps {
  children?: any;
  // These are mutually exclusive, rest parameters cannot be
  // optional, and optional parameters can not be spread.
  modifier?: "rest" | "optional";
}

export interface ParameterNode extends AstNode {
  type: typeof type;
  props: ParameterProps;
}

export function createParameter(props: ParameterProps): ParameterNode {
  const modifier = props.modifier;
  const walker = createChildWalker(type, props);

  const p_name = walker.spliceAssertNext([
    "ident",
    "bind:array",
    "bind:object",
  ]);

  if (
    modifier === "optional" &&
    ["bind:array", "bind:object"].includes(p_name.type)
  ) {
    throw new InvalidSyntaxError(
      `<${type}> cannot contain a <bind:array>, or <bind:object> if it is also optional`
    );
  }

  if (walker.remainingChildren.length === 0) {
    return {
      type,
      props,
      render: () =>
        `${modifier === "rest" ? "..." : ""}${p_name.render()}${
          modifier === "optional" ? "?" : ""
        }`,
    };
  }

  const p_type = walker.spliceAssertNext(ANY_TYPE);

  if (!isTypeType(p_type.type)) {
    if (walker.remainingChildren.length > 0) {
      throw new InvalidSyntaxError(
        `<${type}> can only have a single initializer`
      );
    }

    if (modifier === "optional") {
      throw new InvalidSyntaxError(
        `<${type}> cannot be optional if it has a default initializer`
      );
    }

    const p_init = p_type;

    return {
      type,
      props,
      render: () => {
        return `${
          modifier === "rest" ? "..." : ""
        }${p_name.render()}=${p_init.render()}`;
      },
    };
  }

  if (walker.remainingChildren.length === 0) {
    return {
      type,
      props,
      render: () =>
        `${modifier === "rest" ? "..." : ""}${p_name.render()}${
          modifier === "optional" ? "?" : ""
        }:${p_type.render()}`,
    };
  }

  const p_init = walker.spliceAssertNext([...VALUE_TYPES]);

  if (modifier === "optional") {
    throw new InvalidSyntaxError(
      `<${type}> cannot be optional if it has a default initializer`
    );
  }

  if (walker.remainingChildren.length > 0) {
    throw new InvalidSyntaxError(
      `<${type}> can only have a single initializer`
    );
  }

  return {
    type,
    props,
    render: () =>
      `${
        modifier === "rest" ? "..." : ""
      }${p_name.render()}:${p_type.render()}=${p_init.render()}`,
  };
}
