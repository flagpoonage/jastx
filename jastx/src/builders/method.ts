import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import type { AstNode, ModifierType } from "../types.js";
import { TYPE_TYPES } from "../types.js";

const type = "method";

export interface MethodProps {
  children: any;
  /**
   * Generator is only useable when a function body is provided,
   * it will throw an error if provided without a body
   */
  generator?: boolean;
  async?: boolean;
  modifier?: ModifierType;
}

export interface MethodNode extends AstNode {
  type: typeof type;
  props: MethodProps;
}

export function isMethod(node: AstNode): node is MethodNode {
  return node.type === type;
}

export function MethodHasBody(node: MethodNode) {
  const children = node.props.children ?? [];
  const child_array = Array.isArray(children) ? children : [children];

  return child_array.some((a) => typeof a !== "string" && a.type === "block");
}

export function createMethod(props: MethodProps): MethodNode {
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNextOptional("ident");

  const parameters = walker.spliceAssertGroup("param");

  if (parameters.slice(0, -1).some((a) => a.props.modifier === "rest")) {
    throw new InvalidSyntaxError(
      `<${type}> may only have a rest parameter as the last parameter`
    );
  }

  const type_parameters = walker.spliceAssertGroup("t:param");

  const type_node = walker.spliceAssertNextOptional([
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
      `${props.modifier ? `${props.modifier} ` : ""}${
        props.async ? "async " : ""
      }${props.generator ? "*" : ""}${
        ident ? ident.render() : ""
      }${render_parameters()}${type_node ? `:${type_node.render()}` : ""}${
        block ? block.render() : ""
      }`,
  };
}
