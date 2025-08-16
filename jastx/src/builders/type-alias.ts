import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const type_literal_type = "t:alias";

export interface TypeAliasProps {
  children: any;
  exported?: boolean;
}

export interface TypeAliasNode extends AstNode {
  type: typeof type_literal_type;
  props: TypeAliasProps;
}

export function createTypeAlias(
  props: TypeAliasProps
): TypeAliasNode {
  const walker = createChildWalker(type_literal_type, props);

  const ident = walker.spliceAssertNext("ident");

  const type_params = walker.spliceAssertGroup("t:param");
  
  const value_node = walker.spliceAssertNext([...TYPE_TYPES]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type_literal_type,
      [
        ...TYPE_TYPES,
        'ident',
        't:param'
      ],
      walker.remainingChildTypes
    );
  }

  return {
    type: type_literal_type,
    props,
    render: () => 
      `${props.exported ? "export " : ""}type ${ident.render()}${
        type_params.length > 0
          ? `<${type_params.map((x) => x.render()).join(",")}>`
          : ""
      }=${value_node.render()}`
  };
}
