import { expect, test } from "vitest";

test("t:ref renders with a simple identifier", () => {
  const v = (
    <t:ref>
      <ident name="X" />
    </t:ref>
  );

  expect(v.render()).toBe("X");
});

test("t:ref renders with generics", () => {
  const v = (
    <t:ref>
      <ident name="X" />
      <t:primitive type="unknown" />
      <t:ref>
        <ident name="Y" />
      </t:ref>
    </t:ref>
  );

  expect(v.render()).toBe("X<unknown,Y>");
});

test("t:ref renders with literal primitive generics", () => {
  const v = (
    <t:ref>
      <ident name="X" />
      <l:string value="test" />
      <l:number value={10} />
      <l:boolean value={true} />
    </t:ref>
  );

  expect(v.render()).toBe('X<"test",10,true>');
});

test.skip("t:ref renders with literal type generics", () => {
  // TODO: Type literal is basically a type object like
  // { name: string };
  // const v = (
  //   <t:ref>
  //   </t:ref>
  // );
  // expect(v.render()).toBe("X<{ name: string }>");
});

test.skip("t:ref renders with tuple type generics", () => {
  // TODO: Tuple type is basically a type array like
  // [string, number];
  // They also support being inside a parent "Type Operator" which
  // allows a readonly flag:
  // readonly [string, number];
  //
  // const v = (
  //   <t:ref>
  //   </t:ref>
  // );
  // expect(v.render()).toBe("X<[string, number]>");
});
test.skip("t:ref renders with indexed types", () => {
  // TODO: Indexed type is basically a like
  // T[number];
  //
  // const v = (
  //   <t:ref>
  //   </t:ref>
  // );
  // expect(v.render()).toBe("X<T[number]>");
});

test("t:ref throws an error with no children", () => {
  expect(() => (
    //@ts-expect-error
    <t:ref></t:ref>
  )).toThrowError();
});

test("t:ref throws an error with no identifier", () => {
  expect(() => (
    <t:ref>
      <t:primitive type="unknown" />
    </t:ref>
  )).toThrowError();
});

test("t:ref throws an error with an out-of-order identifier", () => {
  expect(() => (
    <t:ref>
      <t:primitive type="unknown" />
      <ident name="X" />
    </t:ref>
  )).toThrowError();
});

test("t:ref throws an error with a non-type, non literal primitive child", () => {
  expect(() => (
    <t:ref>
      <ident name="X" />
      <bind:array-elem>
        <ident name="x" />
      </bind:array-elem>
    </t:ref>
  )).toThrowError();
});
