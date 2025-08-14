import { expect, test } from "vitest";

const assignment_operators = [
  "=",
  "*=",
  "/=",
  "%=",
  "+=",
  "-=",
  "<<=",
  ">>=",
  ">>>=",
  "&=",
  "^=",
  "!=",
  "**=",
  "&&=",
  "||=",
  "??=",
] as const;

const operator_list = [
  "+",
  "-",
  "/",
  "*",
  "**",
  "%",
  "<",
  "<=",
  "==",
  ">=",
  ">",
  "instanceof",
  "in",
  "==",
  "!=",
  "===",
  "!==",
  "<<",
  ">>",
  ">>>",
  "&",
  "|",
  "^",
  "&&",
  "||",
  "??",
  ...assignment_operators,
] as const;

test("<expr:binary renders all values correctly", () => {
  for (const operator of operator_list) {
    expect(
      (
        <expr:binary operator={operator}>
          <ident name="a" />
          <ident name="b" />
        </expr:binary>
      ).render()
    ).toBe(`a ${operator} b`);
  }
});

test("<expr:binary throws an error when an invalid LHS is used with an assignment operator", () => {
  for (const operator of assignment_operators) {
    expect(() => (
      <expr:binary operator={operator}>
        <l:number value={10} />
        <ident name="b" />
      </expr:binary>
    )).toThrow();
  }
});
