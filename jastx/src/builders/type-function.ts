import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const type = "t:function";

export interface TypeFunctionProps {
  children: any;
  async?: boolean;
}

export interface TypeFunctionNode extends AstNode {
  type: typeof type;
  props: TypeFunctionProps;
}

export function createTypeFunction(props: TypeFunctionProps): TypeFunctionNode {
  const walker = createChildWalker(type, props);

  const parameters = walker.spliceAssertGroup("param");

  if (parameters.slice(0, -1).some((a) => a.props.modifier === "rest")) {
    throw new InvalidSyntaxError(
      `<${type}> may only have a rest parameter as the last parameter`
    );
  }

  const type_parameters = walker.spliceAssertGroup("t:param");

  const render_parameters = () => {
    if (type_parameters.length > 0) {
      return `<${type_parameters.map((a) => a.render()).join(",")}>(${parameters
        .map((a) => a.render())
        .join(",")})`;
    }

    return `(${parameters.map((a) => a.render()).join(",")})`;
  };

  const type_node = walker.spliceAssertNext([
    ...TYPE_TYPES,
    "l:string",
    "l:number",
    "l:boolean",
    "l:bigint",
  ]);

  if (walker.remainingChildren.length > 0) {
    // TODO: Need a better error than this. One that says basically that
    // the children might be invalid, or they might have already been used
    // in cases where only one of a type is required.
    throw new InvalidSyntaxError(
      `<${type}> has either too many children, or invalid children:\n${walker.remainingChildTypes
        .map((a) => `- <${a}>`)
        .join("\n")}`
    );
  }

  return {
    type,
    props,
    render: () => `${render_parameters()}=>${type_node.render()}`,
  };
}
