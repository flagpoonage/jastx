import type { ArrowFunctionProps } from "./builders/arrow-function.js";
import { createArrowFunction } from "./builders/arrow-function.js";
import type { AsExpressionProps } from "./builders/as-expression.js";
import { createAsExpression } from "./builders/as-expression.js";
import type { BinaryExpressionProps } from "./builders/binary-expression.js";
import { createBinaryExpression } from "./builders/binary-expression.js";
import type {
  ArrayBindingElementProps,
  ArrayBindingProps,
  ObjectBindingElementProps,
  ObjectBindingProps,
} from "./builders/binding.js";
import {
  createArrayBinding,
  createArrayBindingElement,
  createObjectBinding,
  createObjectBindingElement,
} from "./builders/binding.js";
import type { BlockProps } from "./builders/blocks.js";
import { createBlock } from "./builders/blocks.js";
import type { CallExpressionProps } from "./builders/call-expression.js";
import { createCallExpression } from "./builders/call-expression.js";
import type { ClassDeclarationProps } from "./builders/class-declaration.js";
import { createClassDeclaration } from "./builders/class-declaration.js";
import type { ClassExpressionProps } from "./builders/class-expression.js";
import { createClassExpression } from "./builders/class-expression.js";
import type { ConditionExpressionProps } from "./builders/conditional-expression.js";
import { createConditionExpression } from "./builders/conditional-expression.js";
import type { DoWhileStatementProps } from "./builders/do-while-statement.js";
import { createDoWhileStatement } from "./builders/do-while-statement.js";
import type { ElementAccessExpressionProps } from "./builders/element-access-expression.js";
import { createElementAccessExpression } from "./builders/element-access-expression.js";
import type { ExportDefaultProps } from "./builders/export-default.js";
import { createExportDefault } from "./builders/export-default.js";
import type {
  ExportDeclarationProps,
  ExportSpecifierProps,
  NamedExportsProps,
  NamespaceExportProps,
} from "./builders/exports.js";
import {
  createExportDeclaration,
  createExportSpecifier,
  createNamedExports,
  createNamespaceExport,
} from "./builders/exports.js";
import type { ExpressionStatementProps } from "./builders/expression-statement.js";
import { createExpressionStatement } from "./builders/expression-statement.js";
import type { FieldProps } from "./builders/field.js";
import { createField } from "./builders/field.js";
import type { ForInStatementProps } from "./builders/for-in-statement.js";
import { createForInStatement } from "./builders/for-in-statement.js";
import type { ForOfStatementProps } from "./builders/for-of-statement.js";
import { createForOfStatement } from "./builders/for-of-statement.js";
import type { ForStatementProps } from "./builders/for-statement.js";
import { createForStatement } from "./builders/for-statement.js";
import type { FunctionDeclarationProps } from "./builders/function-declaration.js";
import { createFunctionDeclaration } from "./builders/function-declaration.js";
import type { FunctionExpressionProps } from "./builders/function-expression.js";
import { createFunctionExpression } from "./builders/function-expression.js";
import type { GetAccessorProps } from "./builders/get-accessor.js";
import { createGetAccessor } from "./builders/get-accessor.js";
import type { HeritageClauseProps } from "./builders/heritage-clause.js";
import { createHeritageClause } from "./builders/heritage-clause.js";
import type { IdentifierProps } from "./builders/identifier.js";
import { createIdentifier } from "./builders/identifier.js";
import type { IfStatementProps } from "./builders/if-statement.js";
import { createIfStatement } from "./builders/if-statement.js";
import type {
  ImportAttributeProps,
  ImportDeclarationProps,
  ImportSpecifierProps,
  NamedImportsProps,
  NamespaceImportProps,
} from "./builders/imports.js";
import {
  createImportAttribute,
  createImportDeclaration,
  createImportSpecifier,
  createNamedImports,
  createNamespaceImport,
} from "./builders/imports.js";
import type {
  ArrayLiteralProps,
  BigintLiteralProps,
  BooleanLiteralProps,
  NumberLiteralProps,
  RegexLiteralProps,
  StringLiteralProps,
} from "./builders/literals.js";
import {
  createArrayLiteral,
  createBigintLiteral,
  createBooleanLiteral,
  createNumberLiteral,
  createRegexLiteral,
  createStringLiteral,
} from "./builders/literals.js";
import type { MethodProps } from "./builders/method.js";
import { createMethod } from "./builders/method.js";
import type { NonNullExpressionProps } from "./builders/non-null-expression.js";
import { createNonNullExpression } from "./builders/non-null-expression.js";
import type {
  ObjectLiteralProps,
  PropertyProps,
} from "./builders/object-literal.js";
import {
  createObjectLiteral,
  createProperty,
} from "./builders/object-literal.js";
import type { ParameterProps } from "./builders/parameter.js";
import { createParameter } from "./builders/parameter.js";
import type { ParensExpressionProps } from "./builders/parens-expressions.js";
import { createParensExpression } from "./builders/parens-expressions.js";
import type { PropertyAccessExpressionProps } from "./builders/property-access-expression.js";
import { createPropertyAccessExpression } from "./builders/property-access-expression.js";
import type { ReturnStatementProps } from "./builders/return-statement.js";
import { createReturnStatement } from "./builders/return-statement.js";
import type { SetAccessorProps } from "./builders/set-accessor.js";
import { createSetAccessor } from "./builders/set-accessor.js";
import type { SourceFileProps } from "./builders/source-file.js";
import { createSourceFile } from "./builders/source-file.js";
import type { SpreadElementProps } from "./builders/spread-element.js";
import { createSpreadElement } from "./builders/spread-element.js";
import type { TemplateExpressionlProps } from "./builders/template-expression.js";
import { createTemplateExpression } from "./builders/template-expression.js";
import type { ThrowStatementProps } from "./builders/throw-statement.js";
import { createThrowStatement } from "./builders/throw-statement.js";
import type {
  CatchClauseProps,
  TryStatementProps,
} from "./builders/try-statement.js";
import {
  createCatchClause,
  createTryStatement,
} from "./builders/try-statement.js";
import type { TypeAliasProps } from "./builders/type-alias.js";
import { createTypeAlias } from "./builders/type-alias.js";
import type { TypeArrayProps } from "./builders/type-array.js";
import { createTypeArray } from "./builders/type-array.js";
import type { TypeConditionalProps } from "./builders/type-conditional.js";
import { createTypeConditional } from "./builders/type-conditional.js";
import type { TypeFunctionProps } from "./builders/type-function.js";
import { createTypeFunction } from "./builders/type-function.js";
import type { TypeIndexedProps } from "./builders/type-indexed.js";
import { createTypeIndexed } from "./builders/type-indexed.js";
import type { TypeInferProps } from "./builders/type-infer.js";
import { createTypeInfer } from "./builders/type-infer.js";
import type { TypeInterfaceProps } from "./builders/type-interface.js";
import { createTypeInterface } from "./builders/type-interface.js";
import type { TypeIntersectionProps } from "./builders/type-intersection.js";
import { createTypeIntersection } from "./builders/type-intersection.js";
import type { TypeLiteralProps } from "./builders/type-literal.js";
import { createTypeLiteral } from "./builders/type-literal.js";
import type { TypeParameterProps } from "./builders/type-parameter.js";
import { createTypeParameter } from "./builders/type-parameter.js";
import type { TypePredicateProps } from "./builders/type-predicate.js";
import { createTypePredicate } from "./builders/type-predicate.js";
import type { TypePrimitiveProps } from "./builders/type-primitive.js";
import { createTypePrimitive } from "./builders/type-primitive.js";
import type { TypeQueryProps } from "./builders/type-query.js";
import { createTypeQuery } from "./builders/type-query.js";
import type { TypeReferenceProps } from "./builders/type-reference.js";
import { createTypeReference } from "./builders/type-reference.js";
import type {
  ConstructSignatureProps,
  IndexSignatureProps,
  MethodSignatureProps,
  PropertySignatureProps,
} from "./builders/type-signatures.js";
import {
  createConstructSignature,
  createIndexSignature,
  createMethodSignature,
  createPropertySignature,
} from "./builders/type-signatures.js";
import type { TypeTupleProps } from "./builders/type-tuple.js";
import { createTypeTuple } from "./builders/type-tuple.js";
import type { TypeUnionProps } from "./builders/type-union.js";
import { createTypeUnion } from "./builders/type-union.js";
import type {
  AwaitExpressionProps,
  DecrementExpressionProps,
  IncrementExpressionProps,
  NotExpressionProps,
  TypeofExpressionProps,
  YieldExpressionProps,
} from "./builders/unary-expression.js";
import {
  createAwaitExpression,
  createDecrementExpression,
  createIncrementExpression,
  createNotExpression,
  createTypeofExpression,
  createYieldExpression,
} from "./builders/unary-expression.js";
import type { VariableDeclarationListProps } from "./builders/variable-declaration-list.js";
import { createVariableDeclarationList } from "./builders/variable-declaration-list.js";
import type { VariableDeclarationProps } from "./builders/variable-declaration.js";
import { createVariableDeclaration } from "./builders/variable-declaration.js";
import type { VariableStatementProps } from "./builders/variable-statement.js";
import { createVariableStatement } from "./builders/variable-statement.js";
import type { WhileStatementProps } from "./builders/while-statement.js";
import { createWhileStatement } from "./builders/while-statement.js";
import type {
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
      case "source-file":
        return createSourceFile(options as SourceFileProps);
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
      case "export-default":
        return createExportDefault(options as ExportDefaultProps);
      case "heritage-clause":
        return createHeritageClause(options as HeritageClauseProps);
      // case "heritage-ident":
      //   return createHeritageIdentifier(options as HeritageIdentifierProps);
      case "property":
        return createProperty(options as PropertyProps);
      case "get-accessor":
        return createGetAccessor(options as GetAccessorProps);
      case "set-accessor":
        return createSetAccessor(options as SetAccessorProps);
      case "method":
        return createMethod(options as MethodProps);
      case "field":
        return createField(options as FieldProps);
      case "named-imports":
        return createNamedImports(options as NamedImportsProps);
      case "namespace-import":
        return createNamespaceImport(options as NamespaceImportProps);
      case "import-specifier":
        return createImportSpecifier(options as ImportSpecifierProps);
      case "import-attribute":
        return createImportAttribute(options as ImportAttributeProps);
      case "spread-element":
        return createSpreadElement(options as SpreadElementProps);

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
      case "dclr:class":
        return createClassDeclaration(options as ClassDeclarationProps);
      case "dclr:import":
        return createImportDeclaration(options as ImportDeclarationProps);

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
      case "t:tuple":
        return createTypeTuple(options as TypeTupleProps);
      case "t:query":
        return createTypeQuery(options as TypeQueryProps);
      case "t:function":
        return createTypeFunction(options as TypeFunctionProps);
      case "t:interface_":
        return createTypeInterface(options as TypeInterfaceProps);
      case "t:alias":
        return createTypeAlias(options as TypeAliasProps);
      case "t:infer":
        return createTypeInfer(options as TypeInferProps);
      case "t:union":
        return createTypeUnion(options as TypeUnionProps);
      case "t:intersection":
        return createTypeIntersection(options as TypeIntersectionProps);
      case "t:array":
        return createTypeArray(options as TypeArrayProps);

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
      case "expr:class":
        return createClassExpression(options as ClassExpressionProps);
      case "expr:increment":
        return createIncrementExpression(options as IncrementExpressionProps);
      case "expr:decrement":
        return createDecrementExpression(options as DecrementExpressionProps);

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
      case "stmt:throw":
        return createThrowStatement(options as ThrowStatementProps);

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
      ["t:tuple"]: TypeTupleProps;
      ["t:query"]: TypeQueryProps;
      ["t:function"]: TypeFunctionProps;
      ["t:interface_"]: TypeInterfaceProps;
      ["t:alias"]: TypeAliasProps;
      ["t:infer"]: TypeInferProps;
      ["t:union"]: TypeUnionProps;
      ["t:intersection"]: TypeIntersectionProps;
      ["t:array"]: TypeArrayProps;

      ["source-file"]: SourceFileProps;
      ["ident"]: IdentifierProps;
      ["block"]: BlockProps;
      ["param"]: ParameterProps;
      ["arrow-function"]: ArrowFunctionProps;
      ["catch-clause"]: CatchClauseProps;
      ["named-exports"]: NamedExportsProps;
      ["namespace-export"]: NamespaceExportProps;
      ["export-specifier"]: ExportSpecifierProps;
      ["export-default"]: ExportDefaultProps;
      ["heritage-clause"]: HeritageClauseProps;
      // ["heritage-ident"]: HeritageIdentifierProps;
      ["property"]: PropertyProps;
      ["get-accessor"]: GetAccessorProps;
      ["set-accessor"]: SetAccessorProps;
      ["method"]: MethodProps;
      ["field"]: FieldProps;
      ["named-imports"]: NamedImportsProps;
      ["namespace-import"]: NamespaceImportProps;
      ["import-specifier"]: ImportSpecifierProps;
      ["import-attribute"]: ImportAttributeProps;
      ["spread-element"]: SpreadElementProps;

      ["dclr:function"]: FunctionDeclarationProps;
      ["dclr:var"]: VariableDeclarationProps;
      ["dclr:var-list"]: VariableDeclarationListProps;
      ["dclr:export"]: ExportDeclarationProps;
      ["dclr:class"]: ClassDeclarationProps;
      ["dclr:import"]: ImportDeclarationProps;

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
      ["stmt:throw"]: ThrowStatementProps;

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
      ["expr:class"]: ClassExpressionProps;
      ["expr:increment"]: IncrementExpressionProps;
      ["expr:decrement"]: DecrementExpressionProps;

      ["bind:array"]: ArrayBindingProps;
      ["bind:object"]: ObjectBindingProps;
      ["bind:array-elem"]: ArrayBindingElementProps;
      ["bind:object-elem"]: ObjectBindingElementProps;
    }
  }
}
