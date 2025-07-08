import { expect, test } from "vitest";

test("expr:non-null renders correctly with an simple literal", () => {
  const v = (
    <expr:prop-access>
      <l:number value={1} />
      <l:number value={1} />
    </expr:prop-access>
  );
  expect(v.render()).toBe("1!");
});

test("expr:non-null renders correctly with a parens expression", () => {
  const v = (
    <expr:non-null>
      <expr:parens>
        <expr:as type="string">
          <l:string value="test" />
        </expr:as>
      </expr:parens>
    </expr:non-null>
  );
  expect(v.render()).toBe('("test" as string)!');
});

test("expr:non-null renders correctly with an identifier", () => {
  const v = (
    <expr:non-null>
      <ident name="x" />
    </expr:non-null>
  );
  expect(v.render()).toBe("x!");
});

test("expr:non-null throws an error when it has no children", () => {
  // @ts-expect-error
  expect(() => <expr:non-null></expr:non-null>).toThrowError();
});

test("expr:non-null throws an error when it has multiple children", () => {
  expect(() => (
    <expr:non-null>
      <expr:as type="string">
        <l:number value={20} />
      </expr:as>
      <expr:as type="string">
        <l:number value={20} />
      </expr:as>
    </expr:non-null>
  )).toThrowError();
});

test("expr:non-null throws an error when it contains non-expressions or literals", () => {
  expect(() => (
    <expr:non-null>
      <var:declaration-list type="const">
        <var:declaration identifier="a" type="string" />
      </var:declaration-list>
    </expr:non-null>
  )).toThrowError();
});

test("expr:non-null throws an error when it contains a non-parens expression", () => {
  expect(() => (
    <expr:non-null>
      <expr:as type="string">
        <l:string value="test" />
      </expr:as>
    </expr:non-null>
  )).toThrowError();
});
