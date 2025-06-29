import { assertNChildren, assertZeroChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, ElementType, PassthroughElementType } from "../types.js";

export const passthroughs: { [K in PassthroughElementType]: ElementType[] } = {
  "var-name": ["identifier", "exact-literal"],
  "fun-name": ["identifier", "exact-literal"],
  initializer: ["exact-literal"],
  type: ["exact-literal"],
};

export type PropertyPassthroughProps = {
  children: any;
};

export interface PropertyPassthroughNode extends AstNode {
  type: `p:${PassthroughElementType}`;
  props: PropertyPassthroughProps;
}

export function makePropertyPassthroughFactory<
  T extends PassthroughElementType
>(type: `p:${T}`, allows: ElementType[]) {
  return function (props: PropertyPassthroughProps) {
    const walker = createChildWalker(props);

    const child = walker.spliceAssertOneof(allows, 1);

    return {
      type,
      props,
      render: () => child.render(),
    };
  };
}

export const createPropertyElement = (
  Object.entries(passthroughs) as [PassthroughElementType, ElementType[]][]
).reduce((acc, [key, val]) => {
  const type: ElementType = `p:${key}`;
  acc[type] = makePropertyPassthroughFactory(type, val);
  return acc;
}, {} as Record<ElementType, (props: PropertyPassthroughProps) => PropertyPassthroughNode>);
