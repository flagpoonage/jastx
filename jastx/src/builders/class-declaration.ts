// import { createChildWalker } from "../child-walker.js";
// import { InvalidSyntaxError } from "../errors.js";
// import { AstNode, TYPE_TYPES } from "../types.js";

// const type = "dclr:class";

// export interface ClassDeclarationProps {
//   children: any;
//   exported?: boolean;
// }

// export interface ClassDeclarationNode extends AstNode {
//   type: typeof type;
//   props: ClassDeclarationProps;
// }

// export function isClassDeclaration(
//   node: AstNode
// ): node is ClassDeclarationNode {
//   return node.type === type;
// }

// export function createClassDeclaration(
//   props: ClassDeclarationProps
// ): ClassDeclarationNode {
//   const walker = createChildWalker(type, props);

//   const ident = walker.spliceAssertNext("ident");

//   const type_parameters = walker.spliceAssertGroup("t:param");

//   const heritage_clause = walker.spliceAssertNextOptional("heritage-clause");

//   const fields = walker.spl


//   const block = walker.spliceAssertNextOptional("block");

//   if (!block && props.generator) {
//     throw new InvalidSyntaxError(
//       `<${type}> cannot declare a generator function without a body. A body can be ommitted in the case that this is an overload declaration, but an overload declaration does not specify the generator syntax`
//     );
//   }

//   if (walker.remainingChildren.length > 0) {
//     if (block) {
//       throw new InvalidSyntaxError(
//         `<${type}> must only specify a <block>. Found a <block> and then another value:\n- ${walker.remainingChildren[0].render()}`
//       );
//     } else {
//       throw new InvalidSyntaxError(
//         `<${type}> can only specify a <block> as the body. This can be ommitted completely for overloads, but no other type can be used`
//       );
//     }
//   }

//   return {
//     type,
//     props,
//     render: () =>
//       `${props.exported ? "export " : ""}${
//         props.async ? "async " : ""
//       }function${props.generator ? "*" : ""} ${
//         ident ? ident.render() : ""
//       }${render_parameters()}${type_node ? `:${type_node.render()}` : ""}${
//         block ? block.render() : ""
//       }`,
//   };
// }
