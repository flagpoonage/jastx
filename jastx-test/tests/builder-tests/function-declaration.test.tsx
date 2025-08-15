import { expect, test } from "vitest";

test("dclr:function renders correctly", () => {
  const v1 = (
    <dclr:function>
      <ident name="test" />
      <block />
    </dclr:function>
  );

  expect(v1.render()).toBe("function test(){}");
});

test("dclr:function renders correctly", () => {
  const v1 = (
    <dclr:function async={true}>
      <ident name="test" />
      <block />
    </dclr:function>
  );

  expect(v1.render()).toBe("async function test(){}");
});

test("dclr:function renders correctly without a body", () => {
  // This is only for overloads, it's a bit shaky about how it's actually valid
  // we would need to compare siblings to see if this actually overloads another
  // function because overloads need to be declared next to each other.
  //
  // We could possibly break with typescript's AST here and declarably force something
  // like
  // <dclr:function>
  //   <dclr:function-overload>
  //      ...type params, params and return values
  //   </dclr:function-overload>
  //   <ident name="test" />
  //   ...rest
  //
  const v1 = (
    <dclr:function>
      <ident name="test" />
    </dclr:function>
  );

  expect(v1.render()).toBe("function test()");
});

test("dclr:function renders with parameters", () => {
  const v1 = (
    <dclr:function>
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
    </dclr:function>
  );

  expect(v1.render()).toBe('function test(a,b:string,c:string="hello"){}');
});

test("dclr:function renders with type parameters", () => {
  const v1 = (
    <dclr:function>
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
    </dclr:function>
  );

  expect(v1.render()).toBe('function test<A,B,C>(a,b:B,c:C="hello"){}');
});

test("dclr:function renders with type predicate", () => {
  const v1 = (
    <dclr:function>
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
    </dclr:function>
  );

  expect(v1.render()).toBe(
    'function test<A,B,C>(a,b:B,c:C="hello"):b is string{}'
  );
});

test("dclr:function renders with generator token", () => {
  const v1 = (
    <dclr:function generator={true}>
      <ident name="test" />
      <block />
    </dclr:function>
  );

  expect(v1.render()).toBe("function* test(){}");
});

test("dclr:function renders with named export", () => {
  const v1 = (
    <dclr:function exported>
      <ident name="test" />
      <block />
    </dclr:function>
  );

  expect(v1.render()).toBe("export function test(){}");
});

test("dclr:function throws an error if no name is provided", () => {
  expect(() => (
    <dclr:function exported>
      <block />
    </dclr:function>
  )).toThrow();

  expect(() => (
    <dclr:function>
      <block />
    </dclr:function>
  )).toThrow();
});

test("dclr:function throws an error if generator is specified without a body", () => {
  expect(() => (
    <dclr:function generator={true}>
      <ident name="test" />
    </dclr:function>
  )).toThrow();
});
