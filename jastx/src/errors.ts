export class InvalidSyntaxError extends Error {}

export class LhsInvalidTypeError extends InvalidSyntaxError {
  constructor(sourceType: string, allowedTypes: string[], actualType: string) {
    super(
      `Left-hand side of <${sourceType}> must be an element of type:\n${allowedTypes
        .map((a) => `- <${a}>`)
        .join("\n")}\nbut found <${actualType}> instead`
    );
  }
}

export class RhsInvalidTypeError extends InvalidSyntaxError {
  constructor(sourceType: string, allowedTypes: string[], actualType: string) {
    super(
      `Right-hand side of <${sourceType}> must be an element of type:\n${allowedTypes
        .map((a) => `- <${a}>`)
        .join("\n")}\nbut found <${actualType}> instead`
    );
  }
}

export class InvalidChildrenError extends InvalidSyntaxError {
  constructor(
    sourceType: string,
    allowedTypes: string[],
    actualTypes: string | string[]
  ) {
    actualTypes = Array.isArray(actualTypes) ? actualTypes : [actualTypes];
    super(
      `<${sourceType}> can only contain children of type:\n${allowedTypes
        .map((a) => `- <${a}>`)
        .join("\n")}\nbut found:\n\n${actualTypes
        .map((a) => `- <${a}>`)
        .join("\n")} instead.`
    );
  }
}
