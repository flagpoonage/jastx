// const type = "keyword";

// export interface BooleanLiteralProps {
//   value: boolean;
// }

// export interface BooleanLiteralNode extends AstNode {
//   type: typeof type;
//   props: BooleanLiteralProps;
// }

// export function createBooleanLiteral(
//   props: BooleanLiteralProps
// ): BooleanLiteralNode {
//   assertZeroChildren(type, props);

//   return {
//     type: type,
//     props,
//     render: () => `${props.value}`,
//   };
// }
