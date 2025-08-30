import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import type { AstNode } from "../types.js";
import { LITERAL_PRIMITIVE_TYPES, TYPE_TYPES } from "../types.js";

const type = "t:ref";

export interface TypeReferenceProps {
  children: any;
}

export interface TypeReferenceNode extends AstNode {
  type: typeof type;
  props: TypeReferenceProps;
}

export function createTypeReference(
  props: TypeReferenceProps
): TypeReferenceNode {
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");

  const type_args = walker.spliceAssertGroup([
    ...TYPE_TYPES,
    ...LITERAL_PRIMITIVE_TYPES,
  ]);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      [...TYPE_TYPES],
      walker.remainingChildTypes
    );
  }

  return {
    type,
    props,
    info: {
      hasGenerics: () => type_args.length > 0,
    },
    render: () =>
      `${ident.render()}${
        type_args.length > 0
          ? `<${type_args.map((a) => a.render()).join(",")}>`
          : ""
      }`,
  };
}
