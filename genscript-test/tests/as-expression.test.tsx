import { expect, test } from "vitest";

test("expr:as renders correctly with simple type and identifier", () => {
  const v = (
    <expr:as>
      <p:type>
        <t:primitive type="string" />
      </p:type>
      <l:number value={1} />
    </expr:as>
  );
  expect(v.render()).toBe("1 as string");
});

test("expr:as renders correctly when nested", () => {
  const v = (
    <expr:as>
      <t:primitive type="string" />
      <expr:as>
        <t:primitive type="unknown" />
        <l:number value={1} />
      </expr:as>
    </expr:as>
  );
  expect(v.render()).toBe("1 as unknown as string");
});

test("expr:as renders correctly with type attribute", () => {
  const v = (
    <expr:as type="string">
      <l:number value={1} />
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
