import {
  ArrowFunctionProps,
  createArrowFunction,
} from "./builders/arrow-function.js";
import {
  AsExpressionProps,
  createAsExpression,
} from "./builders/as-expression.js";
import {
  BinaryExpressionProps,
  createBinaryExpression,
} from "./builders/binary-expression.js";
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
  ConditionExpressionProps,
  createConditionExpression,
} from "./builders/conditional-expression.js";
import {
  createDoWhileStatement,
  DoWhileStatementProps,
} from "./builders/do-while-statement.js";
import {
  createElementAccessExpression,
  ElementAccessExpressionProps,
} from "./builders/element-access-expression.js";
import {
  createExportDeclaration,
  createExportSpecifier,
  createNamedExports,
  createNamespaceExport,
  ExportDeclarationProps,
  ExportSpecifierProps,
  NamedExportsProps,
  NamespaceExportProps,
} from "./builders/exports.js";
import {
  createExpressionStatement,
  ExpressionStatementProps,
} from "./builders/expression-statement.js";
import {
  createForInStatement,
  ForInStatementProps,
} from "./builders/for-in-statement.js";
import {
  createForOfStatement,
  ForOfStatementProps,
} from "./builders/for-of-statement.js";
import {
  createForStatement,
  ForStatementProps,
} from "./builders/for-statement.js";
import {
  createFunctionDeclaration,
  FunctionDeclarationProps,
} from "./builders/function-declaration.js";
import {
  createFunctionExpression,
  FunctionExpressionProps,
} from "./builders/function-expression.js";
import { createIdentifier, IdentifierProps } from "./builders/identifier.js";
import {
  createIfStatement,
  IfStatementProps,
} from "./builders/if-statement.js";
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
  createPropertyAccessExpression,
  PropertyAccessExpressionProps,
} from "./builders/property-access-expression.js";
import {
  createReturnStatement,
  ReturnStatementProps,
} from "./builders/return-statement.js";
import {
  createTemplateExpression,
  TemplateExpressionlProps,
} from "./builders/template-expression.js";
import {
  CatchClauseProps,
  createCatchClause,
  createTryStatement,
  TryStatementProps,
} from "./builders/try-statement.js";
import {
  createTypeConditional,
  TypeConditionalProps,
} from "./builders/type-conditional.js";
import {
  createTypeIndexed,
  TypeIndexedProps,
} from "./builders/type-indexed.js";
import {
  createTypeLiteral,
  TypeLiteralProps,
} from "./builders/type-literal.js";
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
  ConstructSignatureProps,
  createConstructSignature,
  createIndexSignature,
  createMethodSignature,
  createPropertySignature,
  IndexSignatureProps,
  MethodSignatureProps,
  PropertySignatureProps,
} from "./builders/type-signatures.js";
import {
  AwaitExpressionProps,
  createAwaitExpression,
  createNotExpression,
  createTypeofExpression,
  createYieldExpression,
  NotExpressionProps,
  TypeofExpressionProps,
  YieldExpressionProps,
} from "./builders/unary-expression.js";
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
  createWhileStatement,
  WhileStatementProps,
} from "./builders/while-statement.js";
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
      // Standalone elements
      case "ident":
        return createIdentifier(options as IdentifierProps);
      case "block":
        return createBlock(options as BlockProps);
      case "param":
        return createParameter(options as ParameterProps);
      case "arrow-function":
        return createArrowFunction(options as ArrowFunctionProps);
      case "catch-clause":
        return createCatchClause(options as CatchClauseProps);
      case "named-exports":
        return createNamedExports(options as NamedExportsProps);
      case "namespace-export":
        return createNamespaceExport(options as NamespaceExportProps);
      case "export-specifier":
        return createExportSpecifier(options as ExportSpecifierProps);

      // Declarations
      case "dclr:function":
        return createFunctionDeclaration(options as FunctionDeclarationProps);

      case "dclr:var":
        return createVariableDeclaration(options as VariableDeclarationProps);
      case "dclr:var-list":
        return createVariableDeclarationList(
          options as VariableDeclarationListProps
        );
      case "dclr:export":
        return createExportDeclaration(options as ExportDeclarationProps);

      // Literal values
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
      case "l:object-prop":
        return createObjectProperty(options as ObjectPropertyProps);
      case "l:array":
        return createArrayLiteral(options as ArrayLiteralProps);

      // Typescript syntax
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
      case "t:method":
        return createMethodSignature(options as MethodSignatureProps);
      case "t:property":
        return createPropertySignature(options as PropertySignatureProps);
      case "t:construct":
        return createConstructSignature(options as ConstructSignatureProps);
      case "t:index":
        return createIndexSignature(options as IndexSignatureProps);
      case "t:literal":
        return createTypeLiteral(options as TypeLiteralProps);

      // Expressions
      case "expr:as":
        return createAsExpression(options as AsExpressionProps);
      case "expr:parens":
        return createParensExpression(options as ParensExpressionProps);
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
      case "expr:not":
        return createNotExpression(options as NotExpressionProps);
      case "expr:await":
        return createAwaitExpression(options as AwaitExpressionProps);
      case "expr:typeof":
        return createTypeofExpression(options as TypeofExpressionProps);
      case "expr:yield_":
        return createYieldExpression(options as YieldExpressionProps);
      case "expr:cond":
        return createConditionExpression(options as ConditionExpressionProps);
      case "expr:binary":
        return createBinaryExpression(options as BinaryExpressionProps);

      // Statements
      case "stmt:if":
        return createIfStatement(options as IfStatementProps);
      case "stmt:var":
        return createVariableStatement(options as VariableStatementProps);
      case "stmt:expr":
        return createExpressionStatement(options as ExpressionStatementProps);
      case "stmt:return":
        return createReturnStatement(options as ReturnStatementProps);
      case "stmt:try":
        return createTryStatement(options as TryStatementProps);
      case "stmt:for-of":
        return createForOfStatement(options as ForOfStatementProps);
      case "stmt:for-in":
        return createForInStatement(options as ForOfStatementProps);
      case "stmt:for":
        return createForStatement(options as ForStatementProps);
      case "stmt:while":
        return createWhileStatement(options as WhileStatementProps);
      case "stmt:do-while":
        return createDoWhileStatement(options as DoWhileStatementProps);

      case "bind:array":
        return createArrayBinding(options as ArrayBindingProps);
      case "bind:array-elem":
        return createArrayBindingElement(options as ArrayBindingElementProps);
      case "bind:object-elem":
        return createObjectBindingElement(options as ObjectBindingElementProps);
      case "bind:object":
        return createObjectBinding(options as ObjectBindingProps);
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
      ["t:method"]: MethodSignatureProps;
      ["t:property"]: PropertySignatureProps;
      ["t:construct"]: ConstructSignatureProps;
      ["t:index"]: IndexSignatureProps;
      ["t:literal"]: TypeLiteralProps;

      ["ident"]: IdentifierProps;
      ["block"]: BlockProps;
      ["param"]: ParameterProps;
      ["arrow-function"]: ArrowFunctionProps;
      ["catch-clause"]: CatchClauseProps;
      ["named-exports"]: NamedExportsProps;
      ["namespace-export"]: NamespaceExportProps;
      ["export-specifier"]: ExportSpecifierProps;

      ["dclr:function"]: FunctionDeclarationProps;
      ["dclr:var"]: VariableDeclarationProps;
      ["dclr:var-list"]: VariableDeclarationListProps;
      ["dclr:export"]: ExportDeclarationProps;

      ["stmt:if"]: IfStatementProps;
      ["stmt:expr"]: ExpressionStatementProps;
      ["stmt:var"]: VariableStatementProps;
      ["stmt:return"]: ReturnStatementProps;
      ["stmt:try"]: TryStatementProps;
      ["stmt:for-of"]: ForOfStatementProps;
      ["stmt:for-in"]: ForInStatementProps;
      ["stmt:for"]: ForStatementProps;
      ["stmt:while"]: WhileStatementProps;
      ["stmt:do-while"]: DoWhileStatementProps;

      ["expr:as"]: AsExpressionProps;
      ["expr:parens"]: ParensExpressionProps;
      ["expr:non-null"]: NonNullExpressionProps;
      ["expr:prop-access"]: PropertyAccessExpressionProps;
      ["expr:elem-access"]: ElementAccessExpressionProps;
      ["expr:template"]: TemplateExpressionlProps;
      ["expr:call"]: CallExpressionProps;
      ["expr:function"]: FunctionExpressionProps;
      ["expr:not"]: NotExpressionProps;
      ["expr:await"]: AwaitExpressionProps;
      ["expr:typeof"]: TypeofExpressionProps;
      ["expr:yield_"]: YieldExpressionProps;
      ["expr:cond"]: ConditionExpressionProps;
      ["expr:binary"]: BinaryExpressionProps;

      ["bind:array"]: ArrayBindingProps;
      ["bind:object"]: ObjectBindingProps;
      ["bind:array-elem"]: ArrayBindingElementProps;
      ["bind:object-elem"]: ObjectBindingElementProps;
    }
  }
}
