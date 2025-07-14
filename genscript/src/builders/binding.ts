import { assertNChildren } from "../asserts.js";
import { createChildWalker } from "../child-walker.js";
import { InvalidChildrenError, InvalidSyntaxError } from "../errors.js";
import { AstNode, ElementType, EXPRESSION_OR_LITERAL_TYPES } from "../types.js";

const array_type = "bind:array";

export interface ArrayBindingProps {
  children: any;
}

export interface ArrayBindingNode extends AstNode {
  type: typeof array_type;
  props: ArrayBindingProps;
}

export function createArrayBinding(props: ArrayBindingProps): ArrayBindingNode {
  const walker = createChildWalker(array_type, props);

  if (walker.remainingChildren.length === 0) {
    throw new InvalidSyntaxError(
      `<${array_type}> requires at least one child element`
    );
  }

  const allowed_types: ElementType[] = [
    "ident",
    "bind:array",
    "bind:object",
    "bind:array-elem",
  ];

  const valid_elements = walker.spliceAssertGroup(allowed_types);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      array_type,
      allowed_types,
      Array.from(new Set(walker.remainingChildren.map((a) => a.type)))
    );
  }

  return {
    type: array_type,
    props,
    render: () => `[${valid_elements.map((a) => a.render()).join(",")}]`,
  };
}

const object_type = "bind:object";
export interface ObjectBindingProps {
  children: any;
}

export interface ObjectBindingNode extends AstNode {
  type: typeof object_type;
  props: ObjectBindingProps;
}

export function createObjectBinding(
  props: ObjectBindingProps
): ObjectBindingNode {
  const walker = createChildWalker(object_type, props);

  if (walker.remainingChildren.length === 0) {
    throw new InvalidSyntaxError(
      `<${object_type}> requires at least one child element`
    );
  }

  const allowed_types: ElementType[] = ["ident", "bind:object-elem"];

  const valid_elements = walker.spliceAssertGroup(allowed_types);

  if (walker.remainingChildren.length > 0) {
    throw new InvalidChildrenError(
      object_type,
      allowed_types,
      Array.from(new Set(walker.remainingChildren.map((a) => a.type)))
    );
  }

  return {
    type: object_type,
    props,
    render: () => `{${valid_elements.map((a) => a.render()).join(",")}}`,
  };
}

const array_elem_type = "bind:array-elem";

export interface ArrayBindingElementProps {
  children: any;
}

export interface ArrayBindingElementNode extends AstNode {
  type: typeof array_elem_type;
  props: ArrayBindingElementProps;
}

export function createArrayBindingElement(
  props: ArrayBindingElementProps
): ArrayBindingElementNode {
  assertNChildren(array_elem_type, 2, props);

  const walker = createChildWalker(array_elem_type, props);

  const lhs = walker.spliceAssertOneof(["ident", "bind:array", "bind:object"]);

  const rhs = walker.spliceAssertOneof([
    ...EXPRESSION_OR_LITERAL_TYPES,
    "ident",
  ]);

  return {
    type: array_elem_type,
    props,
    render: () => `${lhs.render()}=${rhs.render()}`,
  };
}

const object_elem_type = "bind:object-elem";

export interface ObjectBindingElementProps {
  mode?: "initializer" | "binding";
  children: any;
}

export interface ObjectBindingElementNode extends AstNode {
  type: typeof object_elem_type;
  props: ObjectBindingElementProps;
}

export function createObjectBindingElement(
  props: ObjectBindingElementProps
): ObjectBindingElementNode {
  const mode = props.mode === "initializer" ? "initializer" : "binding";

  assertNChildren(object_elem_type, 2, props);

  const walker = createChildWalker(object_elem_type, props);
  const lhs = walker.spliceAssertNext(["ident"]);

  const rhs =
    mode === "binding"
      ? walker.spliceAssertNext(["ident", "bind:array", "bind:object"])
      : walker.spliceAssertNext([...EXPRESSION_OR_LITERAL_TYPES, "ident"]);

  return {
    type: object_elem_type,
    props,
    render: () =>
      `${lhs.render()}${mode === "initializer" ? "=" : ":"}${rhs.render()}`,
  };
}
