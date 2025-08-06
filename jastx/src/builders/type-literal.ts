import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode } from "../types.js";

const type_literal_type = "t:literal";

export interface TypeLiteralProps {
  children?: any;
}

export interface TypeLiteralNode extends AstNode {
  type: typeof type_literal_type;
  props: TypeLiteralProps;
}

export function createTypeLiteral(props: TypeLiteralProps): TypeLiteralNode {
  const walker = createChildWalker(type_literal_type, props);

  const property_nodes = walker.spliceAssertGroup([
    "t:property",
    "t:index",
    "t:construct",
    "t:method",
  ]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type_literal_type,
      ["t:property", "t:index", "t:construct", "t:method"],
      walker.remainingChildTypes
    );
  }

  return {
    type: type_literal_type,
    props,
    render: () => `{${property_nodes.map((a) => `${a.render()};`).join("")}}`,
  };
}
