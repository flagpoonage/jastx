import { assertMaxChildren, assertValue } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError, InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

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
  const walker = createChildWalker(spec_type, props);

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
  const walker = createChildWalker(type, props);

  const [values, source] = walker.spliceAssertExactPath([""]);

  const ident =
    // Default exports do not require a name
    props.exported === "default"
      ? walker.spliceAssertNextOptional("ident")
      : walker.spliceAssertNext("ident");

  const parameters = walker.spliceAssertGroup("param");

  if (parameters.slice(0, -1).some((a) => a.props.modifier === "rest")) {
    throw new InvalidSyntaxError(
      `<${type}> may only have a rest parameter as the last parameter`
    );
  }

  const type_parameters = walker.spliceAssertGroup("t:param");

  let type_node = walker.spliceAssertNextOptional([
    ...TYPE_TYPES,
    "t:predicate",
  ]);

  const render_parameters = () => {
    if (type_parameters.length > 0) {
      return `<${type_parameters.map((a) => a.render()).join(",")}>(${parameters
        .map((a) => a.render())
        .join(",")})`;
    }

    return `(${parameters.map((a) => a.render()).join(",")})`;
  };

  const block = walker.spliceAssertNextOptional("block");

  if (!block && props.generator) {
    throw new InvalidSyntaxError(
      `<${type}> cannot declare a generator function without a body. A body can be ommitted in the case that this is an overload declaration, but an overload declaration does not specify the generator syntax`
    );
  }

  if (walker.remainingChildren.length > 0) {
    if (block) {
      throw new InvalidSyntaxError(
        `<${type}> must only specify a <block>. Found a <block> and then another value:\n- ${walker.remainingChildren[0].render()}`
      );
    } else {
      throw new InvalidSyntaxError(
        `<${type}> can only specify a <block> as the body. This can be ommitted completely for overloads, but no other type can be used`
      );
    }
  }

  const render_export_modifiers = () =>
    export_type === "default"
      ? "export default "
      : export_type === "named"
      ? "export "
      : "";

  return {
    type,
    props,
    render: () =>
      `${props.async ? "async " : ""}${render_export_modifiers()}function${
        props.generator ? "*" : ""
      } ${ident ? ident.render() : ""}${render_parameters()}${
        type_node ? `:${type_node.render()}` : ""
      }${block ? block.render() : ""}`,
  };
}
