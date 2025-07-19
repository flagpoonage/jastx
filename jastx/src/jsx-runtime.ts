import {
  ArrowFunctionProps,
  createArrowFunction,
} from "./builders/arrow-function.js";
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
import { BlockProps, createBlock } from "./builders/blocks.js";
import {
  CallExpressionProps,
  createCallExpression,
} from "./builders/call-expression.js";
import {
  createElementAccessExpression,
  ElementAccessExpressionProps,
} from "./builders/element-access-expression.js";
import {
  createExactLiteral,
  ExactLiteralProps,
} from "./builders/exact-literal.js";
import {
  createFunctionDeclaration,
  FunctionDeclarationProps,
} from "./builders/function-declaration.js";
import {
  createFunctionExpression,
  FunctionExpressionNode,
  FunctionExpressionProps,
} from "./builders/function-expression.js";
import { createIdentifier, IdentifierProps } from "./builders/identifier.js";
import {
  ArrayLiteralProps,
  BigintLiteralProps,
  BooleanLiteralProps,
  createArrayLiteral,
  createBigintLiteral,
  createBooleanLiteral,
  createNumberLiteral,
  createRegexLiteral,
  createStringLiteral,
  NumberLiteralProps,
  RegexLiteralProps,
  StringLiteralProps,
} from "./builders/literals.js";
import {
  createNonNullExpression,
  NonNullExpressionProps,
} from "./builders/non-null-expression.js";
import {
  createObjectLiteral,
  createObjectProperty,
  ObjectLiteralProps,
  ObjectPropertyProps,
} from "./builders/object-literal.js";
import { createParameter, ParameterProps } from "./builders/parameter.js";
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
  createTypeConditional,
  TypeConditionalProps,
} from "./builders/type-conditional.js";
import {
  createTypeIndexed,
  TypeIndexedProps,
} from "./builders/type-indexed.js";
import {
  createTypeParameter,
  TypeParameterProps,
} from "./builders/type-parameter.js";
import {
  createTypePredicate,
  TypePredicateProps,
} from "./builders/type-predicate.js";
import {
  createTypePrimitive,
  TypePrimitiveProps,
} from "./builders/type-primitive.js";
import {
  createTypeReference,
  TypeReferenceProps,
} from "./builders/type-reference.js";
import {
  createVariableDeclarationList,
  VariableDeclarationListProps,
} from "./builders/variable-declaration-list.js";
import {
  createVariableDeclaration,
  VariableDeclarationProps,
} from "./builders/variable-declaration.js";
import {
  createVariableStatement,
  VariableStatementProps,
} from "./builders/variable-statement.js";
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
      case "block":
        return createBlock(options as BlockProps);
      case "param":
        return createParameter(options as ParameterProps);
      case "arrow-function":
        return createArrowFunction(options as ArrowFunctionProps);
      case "function-declaration":
        return createFunctionDeclaration(options as FunctionDeclarationProps);

      case "exact-literal":
        return createExactLiteral(options as ExactLiteralProps);
      case "var:declaration":
        return createVariableDeclaration(options as VariableDeclarationProps);
      case "var:declaration-list":
        return createVariableDeclarationList(
          options as VariableDeclarationListProps
        );
      case "var:statement":
        return createVariableStatement(options as VariableStatementProps);
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
      case "l:array":
        return createArrayLiteral(options as ArrayLiteralProps);

      case "t:primitive":
        return createTypePrimitive(options as TypePrimitiveProps);
      case "t:ref":
        return createTypeReference(options as TypeReferenceProps);
      case "t:cond":
        return createTypeConditional(options as TypeConditionalProps);
      case "t:indexed":
        return createTypeIndexed(options as TypeIndexedProps);
      case "t:param":
        return createTypeParameter(options as TypeParameterProps);
      case "t:predicate":
        return createTypePredicate(options as TypePredicateProps);

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
      case "expr:call":
        return createCallExpression(options as CallExpressionProps);
      case "expr:function":
        return createFunctionExpression(options as FunctionExpressionProps);

      case "bind:array":
        return createArrayBinding(options as ArrayBindingProps);
      case "bind:array-elem":
        return createArrayBindingElement(options as ArrayBindingElementProps);
      case "bind:object-elem":
        return createObjectBindingElement(options as ObjectBindingElementProps);
      case "bind:object":
        return createObjectBinding(options as ObjectBindingProps);

      case "l:object-prop":
        return createObjectProperty(options as ObjectPropertyProps);
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
      ["l:array"]: ArrayLiteralProps;

      ["l:object-prop"]: ObjectPropertyProps;

      ["t:primitive"]: TypePrimitiveProps;
      ["t:ref"]: TypeReferenceProps;
      ["t:cond"]: TypeConditionalProps;
      ["t:indexed"]: TypeIndexedProps;
      ["t:param"]: TypeParameterProps;
      ["t:predicate"]: TypePredicateProps;

      ["ident"]: IdentifierProps;
      ["block"]: BlockProps;
      ["param"]: ParameterProps;
      ["arrow-function"]: ArrowFunctionProps;
      ["function-declaration"]: FunctionDeclarationProps;

      ["exact-literal"]: ExactLiteralProps;
      ["var:declaration"]: VariableDeclarationProps;
      ["var:declaration-list"]: VariableDeclarationListProps;
      ["var:statement"]: VariableStatementProps;
      ["expr:as"]: AsExpressionProps;
      ["expr:parens"]: ParensExpressionProps;
      ["expr:non-null"]: NonNullExpressionProps;
      ["expr:prop-access"]: PropertyAccessExpressionProps;
      ["expr:elem-access"]: ElementAccessExpressionProps;
      ["expr:template"]: TemplateExpressionlProps;
      ["expr:call"]: CallExpressionProps;
      ["expr:function"]: FunctionExpressionProps;

      ["bind:array"]: ArrayBindingProps;
      ["bind:object"]: ObjectBindingProps;
      ["bind:array-elem"]: ArrayBindingElementProps;
      ["bind:object-elem"]: ObjectBindingElementProps;
    }
  }
}
