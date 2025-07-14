import {
  AsExpressionProps,
  createAsExpression,
} from "./builders/as-expression.js";
import {
  ArrayBindingElementProps,
  ArrayBindingProps,
  createArrayBinding,
  createArrayBindingElement,
  createObjectBinding,
  createObjectBindingElement,
  ObjectBindingElementProps,
  ObjectBindingProps,
} from "./builders/binding.js";
import {
  createElementAccessExpression,
  ElementAccessExpressionProps,
} from "./builders/element-access-expression.js";
import {
  createExactLiteral,
  ExactLiteralProps,
} from "./builders/exact-literal.js";
import { createIdentifier, IdentifierProps } from "./builders/identifier.js";
import {
  BigintLiteralProps,
  BooleanLiteralProps,
  createBigintLiteral,
  createBooleanLiteral,
  createNumberLiteral,
  createObjectLiteral,
  createRegexLiteral,
  createStringLiteral,
  NumberLiteralProps,
  ObjectLiteralProps,
  RegexLiteralProps,
  StringLiteralProps,
} from "./builders/literals.js";
import {
  createNonNullExpression,
  NonNullExpressionProps,
} from "./builders/non-null-expression.js";
import {
  createParensExpression,
  ParensExpressionProps,
} from "./builders/parens-expressions.js";
import {
  createPropertyElement,
  PropertyPassthroughProps,
} from "./builders/properties.js";
import {
  createPropertyAccessExpression,
  PropertyAccessExpressionProps,
} from "./builders/property-access-expression.js";
import {
  createTemplateExpression,
  TemplateExpressionlProps,
} from "./builders/template-expression.js";
import {
  createTypePrimitive,
  TypePrimitiveProps,
} from "./builders/type-primitive.js";
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
      case "ident":
        return createIdentifier(options as IdentifierProps);
      case "exact-literal":
        return createExactLiteral(options as ExactLiteralProps);
      case "var:declaration":
        return createVariableDeclaration(options as VariableDeclarationProps);
      case "var:declaration-list":
        return createVariableDeclarationList(
          options as VariableDeclarationListProps
        );
      case "expr:as":
        return createAsExpression(options as AsExpressionProps);
      case "expr:parens":
        return createParensExpression(options as ParensExpressionProps);
      case "l:boolean":
        return createBooleanLiteral(options as BooleanLiteralProps);
      case "l:number":
        return createNumberLiteral(options as NumberLiteralProps);
      case "l:string":
        return createStringLiteral(options as StringLiteralProps);
      case "l:regex":
        return createRegexLiteral(options as RegexLiteralProps);
      case "l:bigint":
        return createBigintLiteral(options as BigintLiteralProps);
      case "l:object":
        return createObjectLiteral(options as ObjectLiteralProps);
      case "t:primitive":
        return createTypePrimitive(options as TypePrimitiveProps);
      case "expr:non-null":
        return createNonNullExpression(options as NonNullExpressionProps);
      case "expr:prop-access":
        return createPropertyAccessExpression(
          options as PropertyAccessExpressionProps
        );
      case "expr:elem-access":
        return createElementAccessExpression(
          options as ElementAccessExpressionProps
        );
      case "expr:template":
        return createTemplateExpression(options as TemplateExpressionlProps);
      case "bind:array":
        return createArrayBinding(options as ArrayBindingProps);
      case "bind:array-elem":
        return createArrayBindingElement(options as ArrayBindingElementProps);
      case "bind:object-elem":
        return createObjectBindingElement(options as ObjectBindingElementProps);
      case "bind:object":
        return createObjectBinding(options as ObjectBindingProps);
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
      ["p:var-name"]: PropertyPassthroughProps;
      ["p:fun-name"]: PropertyPassthroughProps;
      ["p:type"]: PropertyPassthroughProps;

      ["l:boolean"]: BooleanLiteralProps;
      ["l:number"]: NumberLiteralProps;
      ["l:string"]: StringLiteralProps;
      ["l:bigint"]: BigintLiteralProps;
      ["l:object"]: ObjectLiteralProps;

      ["t:primitive"]: TypePrimitiveProps;

      ["ident"]: IdentifierProps;
      ["exact-literal"]: ExactLiteralProps;
      ["var:declaration"]: VariableDeclarationProps;
      ["var:declaration-list"]: VariableDeclarationListProps;
      ["expr:as"]: AsExpressionProps;
      ["expr:parens"]: ParensExpressionProps;
      ["expr:non-null"]: NonNullExpressionProps;
      ["expr:prop-access"]: PropertyAccessExpressionProps;
      ["expr:elem-access"]: ElementAccessExpressionProps;
      ["expr:template"]: TemplateExpressionlProps;

      ["bind:array"]: ArrayBindingProps;
      ["bind:object"]: ObjectBindingProps;
      ["bind:array-elem"]: ArrayBindingElementProps;
      ["bind:object-elem"]: ObjectBindingElementProps;
    }
  }
}
