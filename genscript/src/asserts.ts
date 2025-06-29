import { InvalidSyntaxError } from "./errors.js";

export function assertZeroChildren(name: string, props: any) {
  return assertNChildren(name, 0, props);
}

export function assertNChildren(name: string, n: number, props: any) {
  if (n < 0) {
    throw new Error(
      `Invalid child count assertion for [${name}]. This is a bug`
    );
  }

  if (n === 0) {
    if (!props || !("children" in props)) {
      return;
    }

    if (Array.isArray(props.children)) {
      if (props.children.length === 0) {
        return;
      }

      throw new InvalidSyntaxError(
        `<${name}> expected [${n}] children but received [${props.children.length}]`
      );
    }

    if (!props.children) {
      return;
    }

    throw new InvalidSyntaxError(
      `<${name}> expected [${n}] children but received [1]`
    );
  }

  if (n === 1) {
    if (props.children) {
      if (!Array.isArray(props.children)) {
        return;
      }

      if (props.children.length === 1) {
        return;
      }

      throw new InvalidSyntaxError(
        `<${name}> expected [${n}] children but received [${props.children.length}]`
      );
    }

    throw new InvalidSyntaxError(
      `<${name}> expected [${n}] children but received [0]`
    );
  }

  if (!Array.isArray(props.children)) {
    throw new InvalidSyntaxError(
      `<${name}> expected [${n}] children but received [${
        props.children ? "1" : "0"
      }]`
    );
  }

  if (props.children.length !== n) {
    throw new InvalidSyntaxError(
      `<${name}> expected [${n}] children but received [${props.children.length}]`
    );
  }
}
