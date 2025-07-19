import { assertMaxChildren, assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, LITERAL_PRIMITIVE_TYPES, TYPE_TYPES } from "../types.js";

const type = "t:predicate";

export interface TypePredicateProps {
  children: any;
  asserts?: boolean;
}

export interface TypePredicateNode extends AstNode {
  type: typeof type;
  props: TypePredicateProps;
}

export function createTypePredicate(
  props: TypePredicateProps
): TypePredicateNode {
  assertNChildren(type, 2, props);

  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");
  const predicate_type = walker.spliceAssertNext([...TYPE_TYPES]);

  return {
    type,
    props,
    render: () =>
      `${
        props.asserts ? "asserts " : ""
      }${ident.render()} is ${predicate_type.render()}`,
  };
}
