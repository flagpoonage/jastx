import { expect, test } from "vitest";

test("expr:parens renders correctly with an simple literal", () => {
  const v = (
    <expr:parens>
      <l:number value={1} />
    </expr:parens>
  );
  expect(v.render()).toBe("(1)");
});

test("expr:parens renders correctly with an as expression", () => {
  const v = (
    <expr:parens>
      <expr:as type="string">
        <l:string value="test" />
      </expr:as>
    </expr:parens>
  );
  expect(v.render()).toBe('("test" as string)');
});

test("expr:parens throws an error when it has no children", () => {
  // @ts-expect-error
  expect(() => <expr:parens></expr:parens>).toThrowError();
});

test("expr:parens throws an error when it has multiple children", () => {
  expect(() => (
    <expr:parens>
      <expr:as type="string">
        <l:number value={20} />
      </expr:as>
      <expr:as type="string">
        <l:number value={20} />
      </expr:as>
    </expr:parens>
  )).toThrowError();
});

test("expr:parens throws an error when it contains non-expressions or literals", () => {
  expect(() => (
    <expr:parens>
      <var:declaration-list type="const">
        <var:declaration identifier="a" type="string" />
      </var:declaration-list>
    </expr:parens>
  )).toThrowError();
});
