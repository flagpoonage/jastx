import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError } from "../errors.js";
import { AstNode, ElementType, TYPE_TYPES } from "../types.js";

const type = "t:intersection";

export interface TypeIntersectionProps {
  children?: any;
}

export interface TypeIntersectionNode extends AstNode {
  type: typeof type;
  props: TypeIntersectionProps;
}

const allowed_types = [
  ...TYPE_TYPES,
  "l:bigint",
  "l:number",
  "l:string",
  "l:boolean",
] satisfies ElementType[];

function canCauseAmbiguity(node: AstNode) {
  // For type unions, we need to wrap them in parenthesis, as the intersection
  // type has precedence, an intersection of A and the union B | C would otherwise
  // be rendered as A & B | C, which resolves to (A & B) | C, rather than A & (B | C)
  return ["t:function", "t:union", "t:cond"].includes(node.type);
}

export function createTypeIntersection(
  props: TypeIntersectionProps
): TypeIntersectionNode {
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
      `${types
        .map((a) => (canCauseAmbiguity(a) ? `(${a.render()})` : a.render()))
        .join("&")}`,
  };
}
