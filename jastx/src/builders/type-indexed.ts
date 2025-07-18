import { assertMaxChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, LITERAL_PRIMITIVE_TYPES, TYPE_TYPES } from "../types.js";

const type = "t:indexed";

export interface TypeIndexedProps {
  children: any;
}

export interface TypeIndexedNode extends AstNode {
  type: typeof type;
  props: TypeIndexedProps;
}

export function createTypeIndexed(props: TypeIndexedProps): TypeIndexedNode {
  assertMaxChildren(type, 2, props);

  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext(["ident", "t:ref", "l:string"]);

  const index_type = walker.spliceAssertNext([
    ...TYPE_TYPES,
    ...LITERAL_PRIMITIVE_TYPES,
  ]);

  return {
    type,
    props,
    render: () => `${ident.render()}[${index_type.render()}]`,
  };
}
