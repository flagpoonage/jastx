import { expect, test } from "vitest";

test("expr:as renders correctly with simple type and identifier", () => {
  const v = (
    <expr:as>
      <l:number value={1} />
      <t:primitive type="string" />
    </expr:as>
  );
  expect(v.render()).toBe("1 as string");
});

test("expr:as renders correctly when nested", () => {
  const v = (
    <expr:as>
      <expr:as>
        <l:number value={1} />
        <t:primitive type="unknown" />
      </expr:as>
      <t:primitive type="string" />
    </expr:as>
  );
  expect(v.render()).toBe("1 as unknown as string");
});

test("expr:as renders correctly with type attribute", () => {
  const v = (
    <expr:as>
      <l:number value={1} />
      <t:primitive type="string" />
    </expr:as>
  );
  expect(v.render()).toBe("1 as string");
});

test("expr:as throws an error when no type is specified", () => {
  expect(() => (
    <expr:as>
      <l:number value={1} />
    </expr:as>
  )).toThrowError();
});

test("expr:as throws an error when multiple expressions are specified ", () => {
  expect(() => (
    <expr:as>
      <l:number value={1} />
      <l:number value={1} />
    </expr:as>
  )).toThrowError();
});
