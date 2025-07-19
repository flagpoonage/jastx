import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES, VALUE_TYPES } from "../types.js";

const type = "arrow-function";

export interface ArrowFunctionProps {
  children: any;
  async?: boolean;
}

export interface ArrowFunctionNode extends AstNode {
  type: typeof type;
  props: ArrowFunctionProps;
}

export function createArrowFunction(
  props: ArrowFunctionProps
): ArrowFunctionNode {
  const walker = createChildWalker(type, props);

  const parameters = walker.spliceAssertGroup("param");
  const type_parameters = walker.spliceAssertGroup("t:param");

  let type_node = walker.spliceAssertNextOptional([
    ...TYPE_TYPES,
    "t:predicate",
  ]);

  const can_avoid_parens =
    parameters.length === 1 &&
    parameters[0].props.children.length === 1 &&
    parameters[0].props.children[0].type === "ident" &&
    type_parameters.length === 0 &&
    !type_node;

  const render_parameters = () => {
    if (can_avoid_parens) {
      // In the case of a single identifier parameter with no type or default information
      // this can be rendered without the enclosing parenthesis like: a => a.toString().
      // This also requires no type parameters, because <T>a => a.toString() is not valid,
      // it must be <T>(a) => a.toString() instead.
      // Additionally, there must be no return type as
      // a: string => a.toString()
      // is invalid syntax, that will be parsed like a label.
      return parameters[0].render();
    }

    if (type_parameters.length > 0) {
      return `<${type_parameters.map((a) => a.render()).join(",")}>(${parameters
        .map((a) => a.render())
        .join(",")})`;
    }

    return `(${parameters.map((a) => a.render()).join(",")})`;
  };

  let implict_return_or_block = walker.spliceAssertNextOptional([
    ...VALUE_TYPES,
  ]);

  if (implict_return_or_block) {
    if (walker.remainingChildren.length > 0) {
      throw new InvalidSyntaxError(
        `<${type}> can not have more than one implicit return value:\n Found ${implict_return_or_block.render()} first, and then found ${walker.remainingChildren[0].render()} next`
      );
    }
  } else {
    implict_return_or_block = walker.spliceAssertNext("block");
    if (walker.remainingChildren.length > 0) {
      throw new InvalidSyntaxError(
        `<${type}> must specify either a single implicit return value or a <block>. Found a <block> and then another value:\n- ${walker.remainingChildren[0].render()}`
      );
    }
  }

  return {
    type,
    props,
    render: () =>
      `${
        props.async ? (can_avoid_parens ? "async " : "async") : ""
      }${render_parameters()}${
        type_node ? `:${type_node.render()}` : ""
      }=>${implict_return_or_block.render()}`,
  };
}
