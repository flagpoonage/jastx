import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidSyntaxError } from "../errors.js";
import { AstNode, TYPE_TYPES } from "../types.js";

const method_signature_type = "t:method";

// Fairly similar to an arrow function, but without the body,
// and with it's own possible "optional flag"
export interface MethodSignatureProps {
  children?: any;
  optional?: boolean;
}

export interface MethodSignatureNode extends AstNode {
  type: typeof method_signature_type;
  props: MethodSignatureProps;
}

export function createMethodSignature(
  props: MethodSignatureProps
): MethodSignatureNode {
  const walker = createChildWalker(method_signature_type, props);

  const ident = walker.spliceAssertNext("ident");

  const parameters = walker.spliceAssertGroup("param");

  if (parameters.slice(0, -1).some((a) => a.props.modifier === "rest")) {
    throw new InvalidSyntaxError(
      `<${method_signature_type}> may only have a rest parameter as the last parameter`
    );
  }

  const type_parameters = walker.spliceAssertGroup("t:param");

  if (walker.remainingChildren.length > 1) {
    throw new InvalidSyntaxError(
      `<${method_signature_type}> must only specify a single return type. But found\n: ${walker.remainingChildren
        .map((a) => `- ${a}`)
        .join("\n")}`
    );
  }

  let type_node = walker.spliceAssertNextOptional([
    ...TYPE_TYPES,
    "t:predicate",
  ]);

  if (!type_node) {
    throw new InvalidSyntaxError(
      `<${method_signature_type}> expected method return type but found none`
    );
  }

  return {
    type: method_signature_type,
    props,
    render: () => {
      const t_params =
        type_parameters.length > 0
          ? `<${type_parameters.map((a) => a.render()).join(",")}>`
          : "";

      return `${ident.render()}${
        props.optional ? "?" : ""
      }${t_params}(${parameters
        .map((a) => a.render())
        .join(",")}):${type_node.render()}`;
    },
  };
}

const property_signature_type = "t:property";

// Fairly similar to an arrow function, but without the body,
// and with it's own possible "optional flag"
export interface PropertySignatureProps {
  children?: any;
  optional?: boolean;
  computed?: boolean;
}

export interface PropertySignatureNode extends AstNode {
  type: typeof property_signature_type;
  props: PropertySignatureProps;
}

export function createPropertySignature(
  props: PropertySignatureProps
): PropertySignatureNode {
  assertNChildren(property_signature_type, 2, props);

  const walker = createChildWalker(property_signature_type, props);

  // TODO: Template literals are supported sometimes in ways I can't figure out currently.
  const ident = walker.spliceAssertNext(["ident", "l:string", "l:number"]);

  const type_node = walker.spliceAssertNext([...TYPE_TYPES]);

  return {
    type: property_signature_type,
    props,
    render: () =>
      `${
        ident.type === "ident" && !props.computed
          ? ident.render()
          : `[${ident.render()}]`
      }${props.optional ? "?" : ""}:${type_node.render()}`,
  };
}

const construct_signature_type = "t:construct";

export interface ConstructSignatureProps {
  children: any;
}

export interface ConstructSignatureNode extends AstNode {
  type: typeof construct_signature_type;
  props: ConstructSignatureProps;
}

export function createConstructSignature(
  props: ConstructSignatureProps
): ConstructSignatureNode {
  const walker = createChildWalker(property_signature_type, props);

  const parameters = walker.spliceAssertGroup("param");

  if (parameters.slice(0, -1).some((a) => a.props.modifier === "rest")) {
    throw new InvalidSyntaxError(
      `<${method_signature_type}> may only have a rest parameter as the last parameter`
    );
  }

  const type_parameters = walker.spliceAssertGroup("t:param");

  if (walker.remainingChildren.length > 1) {
    throw new InvalidSyntaxError(
      `<${method_signature_type}> must only specify a single return type. But found\n: ${walker.remainingChildren
        .map((a) => `- ${a}`)
        .join("\n")}`
    );
  }

  const type_node = walker.spliceAssertNext([...TYPE_TYPES, "t:predicate"]);

  return {
    type: construct_signature_type,
    props,
    render: () => {
      const t_params =
        type_parameters.length > 0
          ? `<${type_parameters.map((a) => a.render()).join(",")}>`
          : "";

      return `new${t_params}(${parameters
        .map((a) => a.render())
        .join(",")}):${type_node.render()}`;
    },
  };
}

const index_signature_type = "t:index";

export interface IndexSignatureProps {
  children: any;
}

export interface IndexSignatureNode extends AstNode {
  type: typeof index_signature_type;
  props: IndexSignatureProps;
}

export function createIndexSignature(
  props: IndexSignatureProps
): IndexSignatureNode {
  const walker = createChildWalker(property_signature_type, props);

  const ident = walker.spliceAssertNext("ident");
  // TODO: t:template support
  const index_type_node = walker.spliceAssertNext("t:primitive");

  if (!["number", "string", "symbol"].includes(index_type_node.props.type)) {
    throw new InvalidSyntaxError(
      `<${index_signature_type}> must have a number, string, or symbol type primitive (TODO: Template literal types), but found: ${index_type_node.props.type}`
    );
  }

  const sig_type_node = walker.spliceAssertNext([...TYPE_TYPES, "t:predicate"]);

  return {
    type: index_signature_type,
    props,
    render: () =>
      `[${ident.render()}:${index_type_node.render()}]:${sig_type_node.render()}`,
  };
}
