import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const type = "expr:function";

export interface FunctionExpressionProps {
  children: any;
  /**
   * Generator is only useable when a function body is provided,
   * it will throw an error if provided without a body
   */
  generator?: boolean;
}

export interface FunctionExpressionNode extends AstNode {
  type: typeof type;
  props: FunctionExpressionProps;
}

export function isFunctionExpression(
  node: AstNode
): node is FunctionExpressionNode {
  return node.type === type;
}

export function FunctionExpressionHasBody(node: FunctionExpressionNode) {
  const children = node.props.children ?? [];
  const child_array = Array.isArray(children) ? children : [children];

  return child_array.some((a) => typeof a !== "string" && a.type === "block");
}

export function createFunctionExpression(
  props: FunctionExpressionProps
): FunctionExpressionNode {
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNextOptional("ident");

  const parameters = walker.spliceAssertGroup("param");
  const type_parameters = walker.spliceAssertGroup("t:param");

  let type_node = walker.spliceAssertNextOptional([
    ...TYPE_TYPES,
    "t:predicate",
  ]);

  const render_parameters = () => {
    if (type_parameters.length > 0) {
      return `<${type_parameters.map((a) => a.render()).join(",")}>(${parameters
        .map((a) => a.render())
        .join(",")})`;
    }

    return `(${parameters.map((a) => a.render()).join(",")})`;
  };

  const block = walker.spliceAssertNext("block");

  if (walker.remainingChildren.length > 0) {
    throw new InvalidSyntaxError(
      `<${type}> must only specify a <block>. Found a <block> and then another value:\n- ${walker.remainingChildren[0].render()}`
    );
  }

  return {
    type,
    props,
    render: () =>
      `function${props.generator ? "*" : ""} ${
        ident ? ident.render() : ""
      }${render_parameters()}${type_node ? `:${type_node.render()}` : ""}${
        block ? block.render() : ""
      }`,
  };
}
