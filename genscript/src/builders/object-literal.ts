import { assertMaxChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const prop_type = "l:object-prop";

export interface ObjectPropertyProps {
  children?: any;
}

export interface ObjectPropertyNode extends AstNode {
  type: typeof prop_type;
  props: ObjectPropertyProps;
}

export function createObjectProperty(
  props: ObjectPropertyProps
): ObjectPropertyNode {
  assertMaxChildren(prop_type, 2, props);
  const walker = createChildWalker(prop_type, props);

  const name_node = walker.spliceAssertNext("ident");

  if (walker.remainingChildren.length === 0) {
    return {
      type: prop_type,
      props,
      render: name_node.render,
    };
  }

  const expr_node = walker.spliceAssertNext([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  return {
    type: prop_type,
    props,
    render: () => `${name_node.render()}:${expr_node.render()}`,
  };
}

const object_type = "l:object";

export interface ObjectLiteralProps {
  children?: any;
}

export interface ObjectLiteralNode extends AstNode {
  type: typeof object_type;
  props: ObjectLiteralProps;
}

export function createObjectLiteral(
  props: ObjectLiteralProps
): ObjectLiteralNode {
  console.warn("TODO: Object literal implementation");

  const walker = createChildWalker(object_type, props);

  const property_nodes = walker.spliceAssertGroup([
    "l:object-prop",
    "l:object-getter",
    "l:object-setter",
  ]);

  return {
    type: object_type,
    props,
    render: () => `{${property_nodes.map((a) => a.render()).join(",")}}`,
  };
}
