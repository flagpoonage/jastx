import { assertMaxChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { AstNode, VALUE_TYPES } from "../types.js";

const prop_type = "property";

export interface PropertyProps {
  children?: any;
}

export interface PropertyNode extends AstNode {
  type: typeof prop_type;
  props: PropertyProps;
}

export function createProperty(
  props: PropertyProps
): PropertyNode {
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

  const expr_node = walker.spliceAssertNext([...VALUE_TYPES]);

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
  const walker = createChildWalker(object_type, props);

  const property_nodes = walker.spliceAssertGroup([
    "property",
    "get-accessor",
    "set-accessor"
  ]);

  return {
    type: object_type,
    props,
    render: () => `{${property_nodes.map((a) => a.render()).join(",")}}`,
  };
}
