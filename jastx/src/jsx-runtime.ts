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
  ClassDeclarationProps,
  createClassDeclaration,
} from "./builders/class-declaration.js";
import {
  ClassExpressionProps,
  createClassExpression,
} from "./builders/class-expression.js";
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
  createExportDefault,
  ExportDefaultProps,
} from "./builders/export-default.js";
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
import { createField, FieldProps } from "./builders/field.js";
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
import {
  createGetAccessor,
  GetAccessorProps,
} from "./builders/get-accessor.js";
import {
  createHeritageClause,
  createHeritageIdentifier,
  HeritageClauseProps,
  HeritageIdentifierProps,
} from "./builders/heritage-clause.js";
import { createIdentifier, IdentifierProps } from "./builders/identifier.js";
import {
  createIfStatement,
  IfStatementProps,
} from "./builders/if-statement.js";
import {
  createImportAttribute,
  createImportDeclaration,
  createImportSpecifier,
  createNamedImports,
  createNamespaceImport,
  ImportAttributeProps,
  ImportDeclarationProps,
  ImportSpecifierProps,
  NamedImportsProps,
  NamespaceImportProps,
} from "./builders/imports.js";
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
import { createMethod, MethodProps } from "./builders/method.js";
import {
  createNonNullExpression,
  NonNullExpressionProps,
} from "./builders/non-null-expression.js";
import {
  createObjectLiteral,
  createProperty,
  ObjectLiteralProps,
  PropertyProps,
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
  createSetAccessor,
  SetAccessorProps,
} from "./builders/set-accessor.js";
import { createSourceFile, SourceFileProps } from "./builders/source-file.js";
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
import { createTypeAlias, TypeAliasProps } from "./builders/type-alias.js";
import { createTypeArray, TypeArrayProps } from "./builders/type-array.js";
import {
  createTypeConditional,
  TypeConditionalProps,
} from "./builders/type-conditional.js";
import {
  createTypeFunction,
  TypeFunctionProps,
} from "./builders/type-function.js";
import {
  createTypeIndexed,
  TypeIndexedProps,
} from "./builders/type-indexed.js";
import { createTypeInfer, TypeInferProps } from "./builders/type-infer.js";
import {
  createTypeInterface,
  TypeInterfaceProps,
} from "./builders/type-interface.js";
import {
  createTypeIntersection,
  TypeIntersectionProps,
} from "./builders/type-intersection.js";
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
import { createTypeQuery, TypeQueryProps } from "./builders/type-query.js";
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
import { createTypeTuple, TypeTupleProps } from "./builders/type-tuple.js";
import { createTypeUnion, TypeUnionProps } from "./builders/type-union.js";
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
      case "heritage-ident":
        return createHeritageIdentifier(options as HeritageIdentifierProps);
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
      ["heritage-ident"]: HeritageIdentifierProps;
      ["property"]: PropertyProps;
      ["get-accessor"]: GetAccessorProps;
      ["set-accessor"]: SetAccessorProps;
      ["method"]: MethodProps;
      ["field"]: FieldProps;
      ["named-imports"]: NamedImportsProps;
      ["namespace-import"]: NamespaceImportProps;
      ["import-specifier"]: ImportSpecifierProps;
      ["import-attribute"]: ImportAttributeProps;

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

      ["bind:array"]: ArrayBindingProps;
      ["bind:object"]: ObjectBindingProps;
      ["bind:array-elem"]: ArrayBindingElementProps;
      ["bind:object-elem"]: ObjectBindingElementProps;
    }
  }
}
