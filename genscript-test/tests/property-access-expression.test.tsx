import { expect, test } from "vitest";

test("expr:prop-access renders correctly with identifiers", () => {
  const v = (
    <expr:prop-access>
      <ident name="x" />
      <ident name="toString" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("x.toString");
});

test("expr:prop-access renders correctly with a string literal LHS", () => {
  const v = (
    <expr:prop-access>
      <l:string value="Hello" />
      <ident name="toString" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("\"Hello\".toString");
});

test("expr:prop-access renders correctly with a boolean literal LHS", () => {
  const v = (
    <expr:prop-access>
      <l:boolean value={false} />
      <ident name="toString" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("false.toString");
});

test("expr:prop-access renders correctly with a number literal in parenthesis LHS", () => {
  const v = (
    <expr:prop-access>
      <expr:parens>
        <l:number value={10} />
      </expr:parens>
      <ident name="toString" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("(10).toString");
});

test("expr:prop-access renders correctly with a nested prop access", () => {
  const v = (
    <expr:prop-access>
      <expr:prop-access>
        <ident name="a" />
        <ident name="b" />
      </expr:prop-access>
      <ident name="c" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("a.b.c");
});

test("expr:elem-access renders correctly with a nested element access", () => {
  const v = (
    <expr:prop-access>
      <expr:elem-access>
        <ident name="a" />
        <ident name="b" />
      </expr:elem-access>
      <ident name="c" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("a[b].c");
});

test("expr:prop-access renders correctly with optional chaining", () => {
  const v = (
    <expr:prop-access optionalChain={true}>
      <expr:prop-access>
        <ident name="a" />
        <ident name="b" />
      </expr:prop-access>
      <ident name="c" />
    </expr:prop-access>
  );
  expect(v.render()).toBe("a.b?.c");
});

test("expr:prop-access throws an error with a number literal LHS", () => {
  expect(() => (
    <expr:prop-access>
      <l:number value={10} />
      <ident name="toString" />
    </expr:prop-access>
  )).toThrowError();
});

test("expr:prop-access throws an error with a prop-access RHS", () => {
  expect(() => (
    <expr:prop-access>
      <ident name="c" />
      <expr:prop-access>
        <ident name="a" />
        <ident name="b" />
      </expr:prop-access>
    </expr:prop-access>
  )).toThrowError();
});

