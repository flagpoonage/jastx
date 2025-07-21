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

test("expr:await renders correctly", () => {
  const v = (
    <expr:await>
      <expr:call>
        <ident name="x" />
      </expr:call>
    </expr:await>
  );

  expect(v.render()).toBe("await x()");
});

test("expr:await renders parenthesis where required", () => {
  const v = (
    <expr:await>
      <arrow-function>
        <ident name="x" />
      </arrow-function>
    </expr:await>
  );

  expect(v.render()).toBe("await (()=>x)");
});
