import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode } from "../types.js";

const type_literal_type = "t:interface_";

export interface TypeInterfaceProps {
  children: any;
  exported?: boolean;
}

export interface TypeInterfaceNode extends AstNode {
  type: typeof type_literal_type;
  props: TypeInterfaceProps;
}

export function createTypeInterface(
  props: TypeInterfaceProps
): TypeInterfaceNode {
  const walker = createChildWalker(type_literal_type, props);

  const ident = walker.spliceAssertNext("ident");

  const type_params = walker.spliceAssertGroup("t:param");

  const heritage_clause = walker.spliceAssertNextOptional("heritage-clause");

  const property_nodes = walker.spliceAssertGroup([
    "t:property",
    "t:index",
    "t:construct",
    "t:method",
  ]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type_literal_type,
      [
        "t:property",
        "t:index",
        "t:construct",
        "t:method",
        "heritage-clause",
        "t:param",
      ],
      walker.remainingChildTypes
    );
  }

  return {
    type: type_literal_type,
    props,
    render: () =>
      `${props.exported ? "export " : ""}interface ${ident.render()}${
        type_params.length > 0
          ? `<${type_params.map((x) => x.render()).join(",")}>`
          : ""
      }${heritage_clause ? ` ${heritage_clause.render()}` : ""}{${property_nodes
        .map((a) => `${a.render()};`)
        .join("")}}`,
  };
}
