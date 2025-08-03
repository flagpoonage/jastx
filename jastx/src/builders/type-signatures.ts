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
      `${ident.type === "ident" ? ident.render() : `[${ident.render()}]`}${
        props.optional ? "?" : ""
      }${type_node.render()}`,
  };
}
