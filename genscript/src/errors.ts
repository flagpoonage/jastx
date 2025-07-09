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
