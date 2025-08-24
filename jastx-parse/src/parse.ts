import type { SyntaxNode, TreeCursor } from "tree-sitter";
import Parser from "tree-sitter";
import ts from "tree-sitter-typescript";
import type { AstNode } from "../../jastx/dist/types.js";
import { parseArrayType } from "./parsers/array_type.js";
import { parseArrowFunction } from "./parsers/arrow_function.js";
import { parseAsExpression } from "./parsers/as_expression.js";
import { parseBinaryExpression } from "./parsers/binary_expression.js";
import { parseCallExpression } from "./parsers/call_expression.js";
import { parseConditionalType } from "./parsers/conditional_type.js";
import { parseConstructSignature } from "./parsers/construct_signature.js";
import { parseDoStatement } from "./parsers/do_statement.js";
import { parseExportClause } from "./parsers/export_clause.js";
import { parseExportSpecifier } from "./parsers/export_specifier.js";
import { parseExportStatement } from "./parsers/export_statement.js";
import { parseExpressionStatement } from "./parsers/expression_statement.js";
import { parseExtendsTypeClause } from "./parsers/extends_type_clause.js";
import { parseForInStatement } from "./parsers/for_in_statement.js";
import { parseForStatement } from "./parsers/for_statement.js";
import { parseFunctionDeclaration } from "./parsers/function_declaration.js";
import { parseFunctionExpression } from "./parsers/function_expression.js";
import { parseGenericType } from "./parsers/generic_type.js";
import { parseIdentifier } from "./parsers/identifier.js";
import { parseIfStatement } from "./parsers/if_statement.js";
import { parseImportSpecifier } from "./parsers/import_specifier.js";
import { parseImportStatement } from "./parsers/import_statement.js";
import { parseIndexSignature } from "./parsers/index_signature.js";
import { parseInferType } from "./parsers/infer_type.js";
import { parseInterfaceDeclaration } from "./parsers/interface_declaration.js";
import { parseIntersectionType } from "./parsers/intersection_type.js";
import { parseLexicalDeclaration } from "./parsers/lexical_declaration.js";
import { parseMemberExpression } from "./parsers/member_expression.js";
import { parseMethodSignature } from "./parsers/method_signature.js";
import { parseNamedImports } from "./parsers/named_imports.js";
import { parseNamespaceImport } from "./parsers/namespace_import.js";
import { parseNumber } from "./parsers/number.js";
import { parseObject } from "./parsers/object.js";
import { parseObjectType } from "./parsers/object_type.js";
import { parseOptionalParameter } from "./parsers/optional_parameter.js";
import { parseParenthesizedExpression } from "./parsers/parenthesized_expression.js";
import { parsePredefinedType } from "./parsers/predefined_type.js";
import { parseProgram } from "./parsers/program.js";
import { parsePropertySignature } from "./parsers/property_signature.js";
import { parseRequiredParameter } from "./parsers/required_parameter.js";
import { parseReturnStatement } from "./parsers/return_statement.js";
import { parseStatementBlock } from "./parsers/statement_block.js";
import { parseString } from "./parsers/string.js";
import { parseSubscriptExpression } from "./parsers/subscript_expression.js";
import { parseTypeAliasDeclaration } from "./parsers/type_alias_declaration.js";
import { parseTypeIdentifier } from "./parsers/type_identifier.js";
import { parseTypeParameter } from "./parsers/type_parameter.js";
import { parseUnionType } from "./parsers/union_type.js";
import { parseUpdateExpression } from "./parsers/update_expression.js";
import { parseVariableDeclarator } from "./parsers/variable_declarator.js";
import { parseWhileStatement } from "./parsers/while_statement.js";
import { passthrough } from "./util.js";

const x = new Parser();
// @ts-expect-error The tree-sitter types are incorrect
x.setLanguage(ts.typescript);

export function stringToJastx(s: string) {
  const parser = x.parse(s);
  const walker = parser.walk();
  const tree = parser.rootNode;

  console.log("X", tree.toString());

  const b = parseNode(tree, walker);

  console.log(
    "OUTPUT",
    b,
    Array.isArray(b) ? b.map((x) => x.render()) : b.render()
  );

  return Array.isArray(b) ? b[0] : b;
}

export function parseNode(n: SyntaxNode, walker: TreeCursor) {
  const jastxNode = getJastxNode(n);

  if (typeof jastxNode !== "function") {
    return jastxNode;
  }

  const children: AstNode[] = [];

  if (!walker.gotoFirstChild()) {
    return jastxNode(children);
  }

  let has_next_node = true;

  while (has_next_node) {
    if (!walker.currentNode.isNamed) {
      // TODO: Might need these...
      has_next_node = walker.gotoNextSibling();
      continue;
    }

    const nodes = parseNode(walker.currentNode, walker);

    if (walker.currentNode.type === "export_statement") {
      console.log("EXPORT STATEMENT OUTPUT IS", nodes);
    }

    console.log(
      Array.isArray(nodes) ? nodes.map((a) => a.render()) : nodes.render()
    );

    children.push(...(Array.isArray(nodes) ? nodes : [nodes]));
    has_next_node = walker.gotoNextSibling();
  }

  walker.gotoParent();

  return jastxNode(children);
}

export function getJastxNode(
  n: SyntaxNode
): AstNode | AstNode[] | ((children: AstNode[]) => AstNode | AstNode[]) {
  switch (n.type) {
    case "program":
      return parseProgram();
    case "import_statement":
      return parseImportStatement(n);
    case "named_imports":
      return parseNamedImports();
    case "namespace_import":
      return parseNamespaceImport();
    case "import_specifier":
      return parseImportSpecifier(n);
    case "identifier":
    case "property_identifier":
      return parseIdentifier(n);
    case "string":
      return parseString(n);
    case "export_statement":
      return parseExportStatement(n);
    case "expression_statement":
      return parseExpressionStatement();
    case "export_specifier":
      return parseExportSpecifier(n);
    case "export_clause":
      return parseExportClause(n);
    case "lexical_declaration":
      return parseLexicalDeclaration(n);
    case "variable_declarator":
      return parseVariableDeclarator();
    case "predefined_type":
      return parsePredefinedType(n);
    case "number":
      return parseNumber(n);
    case "generic_type":
      return parseGenericType(n);
    // case "type_arguments":
    //   return parseTypeArguments();
    case "if_statement":
      return parseIfStatement(n);
    case "binary_expression":
      return parseBinaryExpression(n);
    case "statement_block":
      return parseStatementBlock();
    case "call_expression":
      return parseCallExpression(n);
    case "member_expression":
      return parseMemberExpression(n);
    case "subscript_expression":
      return parseSubscriptExpression(n);
    case "return_statement":
      return parseReturnStatement();
    case "function_declaration":
      return parseFunctionDeclaration(n);
    case "type_parameter":
      return parseTypeParameter(n);
    case "required_parameter":
      return parseRequiredParameter(n);
    case "optional_parameter":
      return parseOptionalParameter(n);
    case "type_identifier":
      return parseTypeIdentifier(n);
    case "array_type":
      return parseArrayType();
    case "as_expression":
      return parseAsExpression();
    case "arrow_function":
      return parseArrowFunction();
    case "for_statement":
      return parseForStatement(n);
    case "update_expression":
      return parseUpdateExpression(n);
    case "for_in_statement":
      return parseForInStatement(n);
    case "while_statement":
      return parseWhileStatement(n);
    case "parenthesized_expression":
      return parseParenthesizedExpression();
    case "do_statement":
      return parseDoStatement(n);
    case "type_alias_declaration":
      return parseTypeAliasDeclaration(n);
    case "conditional_type":
      return parseConditionalType();
    case "infer_type":
      return parseInferType(n);
    case "interface_declaration":
      return parseInterfaceDeclaration(n);
    case "property_signature":
      return parsePropertySignature(n);
    case "extends_type_clause":
      return parseExtendsTypeClause();
    case "construct_signature":
      return parseConstructSignature(n);
    case "method_signature":
      return parseMethodSignature(n);
    case "index_signature":
      return parseIndexSignature(n);
    case "object_type":
      return parseObjectType(n);
    case "intersection_type":
      return parseIntersectionType(n);
    case "union_type":
      return parseUnionType(n);
    case "object":
      return parseObject(n);
    case "function_expression":
      return parseFunctionExpression(n);

    // These don't define any syntax in jastx, they
    // are basically grouping nodes or marking nodes
    case "import_clause":
    case "else_clause":
    case "arguments":
    case "type_parameters":
    case "type_annotation":
    case "constraint":
    case "default_type":
    case "literal_type":
    case "formal_parameters":
    case "rest_pattern":
    case "type_arguments":
    case "interface_body":
    case "computed_property_name":
      return passthrough;
    // These are handled internally by each parent node
    // that encounters them, so we don't consider their
    // syntax directly.
    case "optional_chain":
      return [];
    default: {
      console.log(n, n.toString());
      throw new Error(`Unknown tree-sitter node [${n.type}]`);
    }
  }
}
