import { assertMaxChildren, assertNChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError, InvalidSyntaxError } from "../errors.js";
import { AstNode } from "../types.js";

const spec_type = "import-specifier";

export interface ImportSpecifierProps {
  children: any;
  typeOnly?: boolean;
}

export interface ImportSpecifierNode extends AstNode {
  type: typeof spec_type;
  props: ImportSpecifierProps;
}

export function createImportSpecifier(
  props: ImportSpecifierProps
): ImportSpecifierNode {
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

const ni_type = "named-imports";

export interface NamedImportsProps {
  children: any;
}

export interface NamedImportsNode extends AstNode {
  type: typeof ni_type;
  props: NamedImportsProps;
}

export function createNamedImports(props: NamedImportsProps): NamedImportsNode {
  const walker = createChildWalker(ni_type, props);

  const import_values = walker.spliceAssertGroup(
    ["ident", "import-specifier"],
    { size: [1, undefined] }
  );

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      ni_type,
      ["ident", "import-specifier"],
      walker.remainingChildTypes
    );
  }

  return {
    type: ni_type,
    props,
    render: () => `{${import_values.map((x) => x.render()).join(",")}}`,
  };
}

const ns_type = "namespace-import";

export interface NamespaceImportProps {
  children: any;
}

export interface NamespaceImportNode extends AstNode {
  type: typeof ns_type;
  props: NamespaceImportProps;
}

export function createNamespaceImport(
  props: NamespaceImportProps
): NamespaceImportNode {
  assertNChildren(ns_type, 1, props);

  const walker = createChildWalker(ns_type, props);

  const import_name = walker.spliceAssertNext("ident");

  return {
    type: ns_type,
    props,
    render: () => `* as ${import_name.render()}`,
  };
}

const att_type = "import-attribute";

export interface ImportAttributeProps {
  children: any;
}

export interface ImportAttributeNode extends AstNode {
  type: typeof att_type;
  props: ImportAttributeProps;
}

export function createImportAttribute(
  props: ImportAttributeProps
): ImportAttributeNode {
  assertNChildren(att_type, 2, props);

  const walker = createChildWalker(att_type, props);
  const [ident, value] = walker.spliceAssertExactPath(["ident", "l:string"]);

  assertValue(ident);
  assertValue(value);

  return {
    type: att_type,
    props,
    render: () => `${ident.render()}:${value.render()}`,
  };
}

const type = "dclr:import";

export interface ImportDeclarationProps {
  children: any;
  typeOnly?: boolean;
}

export interface ImportDeclarationNode extends AstNode {
  type: typeof type;
  props: ImportDeclarationProps;
}

export function isImportDeclaration(
  node: AstNode
): node is ImportDeclarationNode {
  return node.type === type;
}

export function createImportDeclaration(
  props: ImportDeclarationProps
): ImportDeclarationNode {
  const { typeOnly = false } = props;

  const walker = createChildWalker(type, props);

  const [default_value, values, source] = walker.spliceAssertExactPath(
    [
      ["ident", null],
      ["named-imports", "namespace-import", null],
      ["l:string"],
    ],
    { noTrailing: false }
  );

  assertValue(source);

  const import_attributes = walker.spliceAssertGroup("import-attribute");

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      type,
      [
        "ident",
        "named-imports",
        "namespace-import",
        "l:string",
        "import-attribute",
      ],
      walker.remainingChildTypes
    );
  }

  const render_clause = () => {
    if (default_value && values) {
      return `${default_value.render()},${values.render()}`;
    } else if (default_value) {
      return default_value.render();
    } else if (values) {
      return values.render();
    }

    return ``;
  };

  return {
    type,
    props,
    render: () =>
      `import${
        typeOnly ? " type " : " "
      }${render_clause()} from ${source.render()}${
        import_attributes.length > 0
          ? ` with {${import_attributes.map((x) => x.render()).join(",")}}`
          : ""
      }`,
  };
}
