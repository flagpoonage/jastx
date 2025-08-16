import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, ModifierType, TYPE_TYPES } from "../types.js";

const type = "set-accessor";

export interface SetAccessorProps {
  children: any;
  modifier?: ModifierType;
}

export interface SetAccessorNode extends AstNode {
  type: typeof type;
  props: SetAccessorProps;
}

export function isSetAccessor(node: AstNode): node is SetAccessorNode {
  return node.type === type;
}

export function createSetAccessor(props: SetAccessorProps): SetAccessorNode {
  const { modifier } = props;
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");

  const type_parameters = walker.spliceAssertGroup("t:param");

  const params = walker.spliceAssertGroup('param');

  if (params.length !== 1) {
    throw new InvalidSyntaxError(`<${type}> must have exactly one <param>, but found [${params.length}]`);
  }

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
      `${modifier ? `${modifier} ` : ""}set ${ident.render()}${
        type_parameters.length > 0
          ? `<${type_parameters.map((a) => a.render()).join(",")}>`
          : ""
      }(${params.map(a => a.render()).join(',')})${block.render()}`,
  };
}
