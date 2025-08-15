import { expect, test } from "vitest";

test("expr:function renders correctly", () => {
  const v1 = (
    <expr:function>
      <ident name="test" />
      <block />
    </expr:function>
  );

  expect(v1.render()).toBe("function test(){}");
});

test("expr:function renders correctly", () => {
  const v2 = (
    <expr:function async={true}>
      <ident name="test" />
      <block />
    </expr:function>
  );

  expect(v2.render()).toBe("async function test(){}");
});

test("expr:function renders with parameters", () => {
  const v1 = (
    <expr:function>
      <ident name="test" />
      <param>
        <ident name="a" />
      </param>
      <param>
        <ident name="b" />
        <t:primitive type="string" />
      </param>
      <param>
        <ident name="c" />
        <t:primitive type="string" />
        <l:string value="hello" />
      </param>
      <block />
    </expr:function>
  );

  expect(v1.render()).toBe('function test(a,b:string,c:string="hello"){}');
});

test("expr:function renders with type parameters", () => {
  const v1 = (
    <expr:function>
      <ident name="test" />
      <t:param>
        <ident name="A" />
      </t:param>
      <t:param>
        <ident name="B" />
      </t:param>
      <t:param>
        <ident name="C" />
      </t:param>
      <param>
        <ident name="a" />
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <param>
        <ident name="c" />
        <t:ref>
          <ident name="C" />
        </t:ref>
        <l:string value="hello" />
      </param>
      <block />
    </expr:function>
  );

  expect(v1.render()).toBe('function test<A,B,C>(a,b:B,c:C="hello"){}');
});

test("expr:function renders with type predicate", () => {
  const v1 = (
    <expr:function>
      <ident name="test" />
      <t:param>
        <ident name="A" />
      </t:param>
      <t:param>
        <ident name="B" />
      </t:param>
      <t:param>
        <ident name="C" />
      </t:param>
      <param>
        <ident name="a" />
      </param>
      <param>
        <ident name="b" />
        <t:ref>
          <ident name="B" />
        </t:ref>
      </param>
      <param>
        <ident name="c" />
        <t:ref>
          <ident name="C" />
        </t:ref>
        <l:string value="hello" />
      </param>
      <t:predicate>
        <ident name="b" />
        <t:primitive type="string" />
      </t:predicate>
      <block />
    </expr:function>
  );

  expect(v1.render()).toBe(
    'function test<A,B,C>(a,b:B,c:C="hello"):b is string{}'
  );
});

test("expr:function renders with generator token", () => {
  const v1 = (
    <expr:function generator={true}>
      <ident name="test" />
      <block />
    </expr:function>
  );

  expect(v1.render()).toBe("function* test(){}");
});

test("expr:function throws an error if no body is spoecified", () => {
  expect(() => (
    <expr:function>
      <ident name="test" />
    </expr:function>
  )).toThrow();
});

test("expr:function throws an error if no other nodes are specifeid", () => {
  expect(() => (
    <expr:function generator={true}>
      <ident name="test" />
      <ident name="test2" />
    </expr:function>
  )).toThrow();
});
