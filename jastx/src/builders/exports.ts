import { assertMaxChildren, assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError, InvalidSyntaxError } from "../errors.js";
import { AstNode } from "../types.js";

const spec_type = "export-specifier";

export interface ExportSpecifierProps {
  children: any;
  typeOnly?: boolean;
}

export interface ExportSpecifierNode extends AstNode {
  type: typeof spec_type;
  props: ExportSpecifierProps;
}

export function createExportSpecifier(
  props: ExportSpecifierProps
): ExportSpecifierNode {
  assertMaxChildren(spec_type, 2, props);
  const { typeOnly = false } = props;

  const walker = createChildWalker(spec_type, props);

  const [ident, alias] = walker.spliceAssertExactPath(
    ["ident", ["ident", null]],
    {
      noTrailing: true,
    }
  );

  assertValue(ident);

  return {
    type: spec_type,
    props,
    render: () =>
      `${typeOnly ? "type " : ""}${ident.render()}${
        alias ? ` as ${alias.render()}` : ""
      }`,
  };
}

const ne_type = "named-exports";

export interface NamedExportsProps {
  children: any;
}

export interface NamedExportsNode extends AstNode {
  type: typeof ne_type;
  props: NamedExportsProps;
}

export function createNamedExports(props: NamedExportsProps): NamedExportsNode {
  const walker = createChildWalker(ne_type, props);

  const export_values = walker.spliceAssertGroup(
    ["ident", "export-specifier"],
    { size: [1, undefined] }
  );

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      ne_type,
      ["ident", "export-specifier"],
      walker.remainingChildTypes
    );
  }

  return {
    type: ne_type,
    props,
    render: () => `{${export_values.map((x) => x.render()).join(",")}}`,
  };
}

const ns_type = "namespace-export";

export interface NamespaceExportProps {
  children: any;
}

export interface NamespaceExportNode extends AstNode {
  type: typeof ns_type;
  props: NamespaceExportProps;
}

export function createNamespaceExport(
  props: NamespaceExportProps
): NamespaceExportNode {
  assertNChildren(ns_type, 1, props);

  const walker = createChildWalker(ns_type, props);

  const export_name = walker.spliceAssertNext("ident");

  return {
    type: ns_type,
    props,
    render: () => `* as ${export_name.render()}`,
  };
}

const type = "dclr:export";

export interface ExportDeclarationProps {
  children: any;
  typeOnly?: boolean;
}

export interface ExportDeclarationNode extends AstNode {
  type: typeof type;
  props: ExportDeclarationProps;
}

export function isExportDeclaration(
  node: AstNode
): node is ExportDeclarationNode {
  return node.type === type;
}

export function createExportDeclaration(
  props: ExportDeclarationProps
): ExportDeclarationNode {
  assertMaxChildren(type, 2, props);

  const { typeOnly = false } = props;

  const walker = createChildWalker(type, props);

  const [values, source] = walker.spliceAssertExactPath([
    ["named-exports", "namespace-export", null],
    ["l:string", null],
  ]);

  if ((!values || values.type !== "named-exports") && !source) {
    throw new InvalidSyntaxError(
      `<${type}> expects a source <l:string>, unless the value node is a <named-exports> node`
    );
  }

  return {
    type,
    props,
    render: () =>
      `export${typeOnly ? " type " : " "}${values ? values.render() : "*"}${
        source ? ` from ${source.render()}` : ""
      }`,
  };
}
