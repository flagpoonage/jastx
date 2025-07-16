import { AstNode } from "../types.js";

const type = "text";

export interface TextNodeProps {
  value: string;
}

export interface TextNode extends AstNode {
  type: "text";
  props: TextNodeProps;
}

export function createTextNode(props: TextNodeProps): TextNode {
  return {
    type,
    props,
    render: () => props.value,
  };
}
