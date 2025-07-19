import { expect, test } from "vitest";

test("expr:not renders correctly", () => {
  const v = (
    <expr:not>
      <ident name="x" />
    </expr:not>
  );

  expect(v.render()).toBe("!x");
});

test("expr:not renders double negation when nested", () => {
  const v = (
    <expr:not>
      <expr:not>
        <ident name="x" />
      </expr:not>
    </expr:not>
  );

  expect(v.render()).toBe("!!x");
});

test("expr:not renders arrow-function expression in parenthesis", () => {
  const v = (
    <expr:not>
      <arrow-function>
        <block />
      </arrow-function>
    </expr:not>
  );

  expect(v.render()).toBe("!(()=>{})");
});
