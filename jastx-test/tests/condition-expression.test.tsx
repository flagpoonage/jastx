import { expect, test } from "vitest";

test("renders correctly with identifiers", () => {
  const v = (
    <expr:cond>
      <ident name="x" />
      <ident name="y" />
      <ident name="z" />
    </expr:cond>
  );

  expect(v.render()).toBe("x?y:z");
});

test("renders correctly with literals", () => {
  const v = (
    <expr:cond>
      <l:boolean value={false} />
      <l:number value={1} />
      <l:string value="hello" />
    </expr:cond>
  );

  expect(v.render()).toBe('false?1:"hello"');
});

test("renders correctly with complex expressions", () => {
  const v = (
    <expr:cond>
      <expr:call>
        <ident name="x" />
      </expr:call>
      <expr:await>
        <expr:call>
          <expr:prop-access optionalChain={true}>
            <ident name="y" />
            <ident name="z" />
          </expr:prop-access>
        </expr:call>
      </expr:await>
      <expr:elem-access>
        <ident name="x" />
        <l:number value={10} />
      </expr:elem-access>
    </expr:cond>
  );

  expect(v.render()).toBe("x()?await y?.z():x[10]");
});

test("throws an error when there is not exactly 3 parameters", () => {
  // @ts-expect-error
  expect(() => <expr:cond></expr:cond>).toThrow();

  expect(() => (
    <expr:cond>
      <ident name="x" />
    </expr:cond>
  )).toThrow();

  expect(() => (
    <expr:cond>
      <ident name="x" />
      <ident name="x" />
    </expr:cond>
  )).toThrow();

  expect(() => (
    <expr:cond>
      <ident name="x" />
      <ident name="x" />
      <ident name="x" />
      <ident name="x" />
    </expr:cond>
  )).toThrow();
});

test("throws an error with statements", () => {
  // @ts-expect-error
  expect(() => <expr:cond></expr:cond>).toThrow();

  expect(() => (
    <expr:cond>
      <ident name="x" />
      <ident name="x" />
      <stmt:expr>
        <ident name="z" />
      </stmt:expr>
    </expr:cond>
  )).toThrow();
});
