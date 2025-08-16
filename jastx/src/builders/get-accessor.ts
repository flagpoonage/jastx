import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, ModifierType, TYPE_TYPES } from "../types.js";

const type = "get-accessor";

export interface GetAccessorProps {
  children: any;
  modifier?: ModifierType;
}

export interface GetAccessorNode extends AstNode {
  type: typeof type;
  props: GetAccessorProps;
}

export function isGetAccessor(node: AstNode): node is GetAccessorNode {
  return node.type === type;
}

export function createGetAccessor(props: GetAccessorProps): GetAccessorNode {
  const { modifier } = props;
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");

  const type_parameters = walker.spliceAssertGroup("t:param");

  let type_node = walker.spliceAssertNextOptional([...TYPE_TYPES]);

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
      `${modifier ? `${modifier} ` : ""}get ${ident.render()}${
        type_parameters.length > 0
          ? `<${type_parameters.map((a) => a.render()).join(",")}>`
          : ""
      }()${type_node ? `:${type_node.render()}` : ""}${block.render()}`,
  };
}
