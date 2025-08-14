import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode, ElementType, TYPE_TYPES } from "../types.js";

const type = "t:tuple";

export interface TypeTupleProps {
  readonly?: boolean;
  children?: any;
}

export interface TypeTupleNode extends AstNode {
  type: typeof type;
  props: TypeTupleProps;
}

const allowed_types = [
  ...TYPE_TYPES,
  "l:bigint",
  "l:number",
  "l:string",
  "l:boolean",
] satisfies ElementType[];

export function createTypeTuple(props: TypeTupleProps): TypeTupleNode {
  const { readonly = false } = props;

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
    render: () =>
      `${readonly ? "readonly " : ""}[${types
        .map((a) => a.render())
        .join(",")}]`,
  };
}
