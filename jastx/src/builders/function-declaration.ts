import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const type = "function-declaration";

export interface FunctionDeclarationProps {
  children: any;
  /**
   * Generator is only useable when a function body is provided,
   * it will throw an error if provided without a body
   */
  generator?: boolean;
  /**
   * Non-default exports require a name, whereas default exports
   * do not. We need to specify this here.
   */
  exported?: "named" | "default";
  async?: boolean;
}

export interface FunctionDeclarationNode extends AstNode {
  type: typeof type;
  props: FunctionDeclarationProps;
}

export function isFunctionDeclaration(
  node: AstNode
): node is FunctionDeclarationNode {
  return node.type === type;
}

export function createFunctionDeclaration(
  props: FunctionDeclarationProps
): FunctionDeclarationNode {
  const walker = createChildWalker(type, props);
  const export_type = props.exported ?? "none";

  const ident =
    // Default exports do not require a name
    props.exported === "default"
      ? walker.spliceAssertNextOptional("ident")
      : walker.spliceAssertNext("ident");

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

  const block = walker.spliceAssertNextOptional("block");

  if (!block && props.generator) {
    throw new InvalidSyntaxError(
      `<${type}> cannot declare a generator function without a body. A body can be ommitted in the case that this is an overload declaration, but an overload declaration does not specify the generator syntax`
    );
  }

  if (walker.remainingChildren.length > 0) {
    if (block) {
      throw new InvalidSyntaxError(
        `<${type}> must only specify a <block>. Found a <block> and then another value:\n- ${walker.remainingChildren[0].render()}`
      );
    } else {
      throw new InvalidSyntaxError(
        `<${type}> can only specify a <block> as the body. This can be ommitted completely for overloads, but no other type can be used`
      );
    }
  }

  const render_export_modifiers = () =>
    export_type === "default"
      ? "export default "
      : export_type === "named"
      ? "export "
      : "";

  return {
    type,
    props,
    render: () =>
      `${props.async ? "async " : ""}${render_export_modifiers()}function${
        props.generator ? "*" : ""
      } ${ident ? ident.render() : ""}${render_parameters()}${
        type_node ? `:${type_node.render()}` : ""
      }${block ? block.render() : ""}`,
  };
}
