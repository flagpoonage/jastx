import { assertNChildren, assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import {
  AstNode,
  ElementType,
  LITERAL_TYPES,
  PassthroughElementTypeName,
} from "../types.js";

export const passthroughs: {
  [K in PassthroughElementTypeName]: ElementType[];
} = {
  "var-name": ["ident", "exact-literal"],
  "fun-name": ["ident", "exact-literal"],
  type: [...LITERAL_TYPES, "t:primitive"],
};

export type PropertyPassthroughProps = {
  children: any;
};

export interface PropertyPassthroughNode extends AstNode {
  type: `p:${PassthroughElementTypeName}`;
  props: PropertyPassthroughProps;
}

export function makePropertyPassthroughFactory<
  T extends PassthroughElementTypeName
>(type: `p:${T}`, allows: ElementType[]) {
  return function (props: PropertyPassthroughProps) {
    const walker = createChildWalker(type, props);

    const child = walker.spliceAssertOneof(allows, 1);

    return {
      type,
      props,
      render: () => child.render(),
    };
  };
}

export const createPropertyElement = (
  Object.entries(passthroughs) as [PassthroughElementTypeName, ElementType[]][]
).reduce((acc, [key, val]) => {
  const type: ElementType = `p:${key}`;
  acc[type] = makePropertyPassthroughFactory(type, val);
  return acc;
}, {} as Record<ElementType, (props: PropertyPassthroughProps) => PropertyPassthroughNode>);
