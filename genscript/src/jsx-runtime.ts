import {
  createExactLiteral,
  ExactLiteralProps,
} from "./builders/exact-literal.js";
import {
  createIdentifier,
  IdentifierNode,
  IdentifierProps,
} from "./builders/identifier.js";
import {
  createPropertyElement,
  PropertyPassthroughProps,
} from "./builders/properties.js";
import {
  createVariableDeclarationList,
  VariableDeclarationListProps,
} from "./builders/variable-declaration-list.js";
import {
  createVariableDeclaration,
  VariableDeclarationProps,
} from "./builders/variable-declaration.js";
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

  try {
    switch (element) {
      case "identifier":
        return createIdentifier(options as IdentifierProps);
      case "exact-literal":
        return createExactLiteral(options as ExactLiteralProps);
      case "variable-declaration":
        return createVariableDeclaration(options as VariableDeclarationProps);
      case "variable-declaration-list":
        return createVariableDeclarationList(
          options as VariableDeclarationListProps
        );
    }

    if (element.startsWith("p:")) {
      return createPropertyElement[element](
        options as PropertyPassthroughProps
      );
    }
  } catch (ex) {
    if (ex instanceof Error) {
      throw new Error(`Error rendering <${element}>: ${ex.message}`);
    } else {
      throw new Error(`Unknown error while rendering <${element}>`);
    }
  }

  throw new Error(`Unable to create AST node for [${element}]`);
};

export const jsx = (
  element: typeof Fragment | ElementType,
  options: JSXCreationInterface
): AstNode =>
  jsxs(element, {
    ...options,
    children: options.children ? [options.children] : void 0,
  });

export const jsxDEV = jsx;

export const Fragment = (): AstNode => {
  throw new Error("Fragment not implemented");
};

declare global {
  namespace JSX {
    type Element = AstNode;

    interface IntrinsicElements {
      ["identifier"]: IdentifierProps;
      ["exact-literal"]: ExactLiteralProps;
      ["variable-declaration"]: VariableDeclarationProps;
      ["variable-declaration-list"]: VariableDeclarationListProps;
      ["p:var-name"]: PropertyPassthroughProps;
      ["p:fun-name"]: PropertyPassthroughProps;
      ["p:initializer"]: PropertyPassthroughProps;
      ["p:type"]: PropertyPassthroughProps;
    }
  }
}
