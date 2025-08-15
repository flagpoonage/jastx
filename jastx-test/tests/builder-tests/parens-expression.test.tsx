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
      <expr:as>
        <l:string value="test" />
        <t:primitive type="string" />
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
      <dclr:var-list type="const">
        <dclr:var>
          <ident name="a" />
        </dclr:var>
      </dclr:var-list>
    </expr:parens>
  )).toThrowError();
});
