import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode, ElementType, TYPE_TYPES } from "../types.js";

const type = "t:union";

export interface TypeUnionProps {
  children?: any;
}

export interface TypeUnionNode extends AstNode {
  type: typeof type;
  props: TypeUnionProps;
}

const allowed_types = [
  ...TYPE_TYPES,
  "l:bigint",
  "l:number",
  "l:string",
  "l:boolean",
] satisfies ElementType[];

export function createTypeUnion(props: TypeUnionProps): TypeUnionNode {
  const walker = createChildWalker(type, props);

  const types = walker.spliceAssertGroup(allowed_types);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      allowed_types,
      walker.remainingChildTypes
    );
  }

  return {
    type,
    props,
    render: () => `${types.map((a) => a.render()).join("|")}`,
  };
}
