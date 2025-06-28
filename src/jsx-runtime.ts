import {
  AstNode,
  ElementType,
  JSXCreationInterface,
  JSXSCreationInterface,
  WithChildren,
} from "./types.js";

export const jsxs = <T>(
  element: typeof Fragment | ((v: T) => AstNode) | ElementType,
  options: JSXSCreationInterface
): AstNode => {
  if (options.children) {
    options.children = options.children.flat(Infinity).filter(Boolean);
  }

  if (element === Fragment) {
    return options.children as unknown as AstNode;
  }

  if (typeof element === "function") {
    return element(options as T);
  }

  switch (element) {
  }
};

export const jsx = (
  element: typeof Fragment | ElementType,
  options: JSXCreationInterface
): AstNode =>
  jsxs(element, {
    ...options,
    children: options.children ? [options.children] : void 0,
  });

export const Fragment = (): AstNode => void 0;

declare global {
  type AstElement = () => AstNode;
  namespace JSX {
    interface IntrinsicElements {}
  }
}
