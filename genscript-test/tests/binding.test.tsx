import { expect, test } from "vitest";

test("bind:array renders correctly with identifiers", () => {
  const v = (
    <bind:array>
      <ident name="x" />
      <ident name="y" />
    </bind:array>
  );
  expect(v.render()).toBe("[x,y]");
});

test("bind:array renders correctly with nested array bindings", () => {
  const v1 = (
    <bind:array>
      <bind:array>
        <ident name="q" />
        <ident name="w" />
      </bind:array>
      <ident name="y" />
    </bind:array>
  );
  expect(v1.render()).toBe("[[q,w],y]");
  const v2 = (
    <bind:array>
      <ident name="x" />
      <bind:array>
        <ident name="q" />
        <ident name="w" />
      </bind:array>
      <ident name="y" />
    </bind:array>
  );
  expect(v2.render()).toBe("[x,[q,w],y]");
});

test("bind:array renders correctly with nested array bindings, with defaults", () => {
  const v1 = (
    <bind:array>
      <bind:array>
        <ident name="q" />
        <bind:array-elem>
          <ident name="x" />
          <l:number value={10} />
        </bind:array-elem>
        <ident name="w" />
      </bind:array>
      <ident name="y" />
    </bind:array>
  );
  expect(v1.render()).toBe("[[q,x=10,w],y]");
  const v2 = (
    <bind:array>
      <ident name="x" />
      <bind:array>
        <ident name="q" />
        <ident name="w" />
      </bind:array>
      <ident name="y" />
    </bind:array>
  );
  expect(v2.render()).toBe("[x,[q,w],y]");
});

test("bind:array renders correctly with nested object bindings", () => {
  const v1 = (
    <bind:array>
      <bind:object>
        <ident name="x" />
        <ident name="z" />
      </bind:object>
      <ident name="y" />
    </bind:array>
  );
  expect(v1.render()).toBe("[{x,z},y]");
  const v2 = (
    <bind:array>
      <ident name="x" />
      <bind:array>
        <ident name="q" />
        <ident name="w" />
      </bind:array>
      <ident name="y" />
    </bind:array>
  );
  expect(v2.render()).toBe("[x,[q,w],y]");
});

test("bind:array throws an error if it's empty", () => {
  expect(() => (
    // @ts-expect-error
    <bind:array></bind:array>
  )).toThrowError();
});

test("bind:object renders correctly", () => {
  const v = (
    <bind:object>
      <ident name="x" />
      <ident name="z" />
    </bind:object>
  );
  expect(v.render()).toBe("{x,z}");
});

test('bind:object-elem renders correctly with initializers', () => {
  const v = (
    <bind:object-elem mode="initializer">
      <ident name="x" />
      <ident name="z" />
    </bind:object-elem>
  );

  expect(v.render()).toBe("x=z");
})

test('bind:object-elem renders correctly with sub bindings', () => {
  const v1 = (
    <bind:object-elem>
      <ident name="x" />
      <bind:array>
        <ident name="b" />
      </bind:array>
    </bind:object-elem>
  );

  expect(v1.render()).toBe("x:[b]");

  const v2 = (
    <bind:object-elem>
      <ident name="x" />
      <bind:object>
        <ident name="b" />
      </bind:object>
    </bind:object-elem>
  );

  expect(v2.render()).toBe("x:{b}");
});

test("bind:object renders correctly with subbindings", () => {
  const v = (
    <bind:object>
      <ident name="x" />
      <bind:object-elem>
        <ident name="q" />
        <bind:object>
          <ident name="b" />
        </bind:object>
      </bind:object-elem>
    </bind:object>
  );
  expect(v.render()).toBe("{x,q:{b}}");
});

