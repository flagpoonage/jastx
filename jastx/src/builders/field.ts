import { createChildWalker } from "../child-walker.js";
import type { AstNode, ModifierType } from "../types.js";
import { TYPE_TYPES, VALUE_TYPES } from "../types.js";

const type = "field";

export interface FieldProps {
  children: any;
  modifier?: ModifierType;
  readonly?: boolean;
}

export interface FieldNode extends AstNode {
  type: typeof type;
  props: FieldProps;
}

export function createField(props: FieldProps): FieldNode {
  const { readonly = false, modifier } = props;
  const walker = createChildWalker(type, props);

  const ident = walker.spliceAssertNext("ident");
  const field_type = walker.spliceAssertNextOptional([...TYPE_TYPES]);

  const expr = walker.spliceAssertNextOptional([...VALUE_TYPES]);

  return {
    type,
    props,
    render: () =>
      `${modifier ? `${modifier} ` : ""}${
        readonly ? `readonly ` : ""
      }${ident.render()}${field_type ? `:${field_type.render()}` : ""}${
        expr ? `=${expr.render()}` : ""
      }`,
  };
}
