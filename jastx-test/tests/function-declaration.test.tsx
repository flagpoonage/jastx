import { expect, test } from "vitest";

test("function-declaration renders correctly", () => {
  const v1 = (
    <function-declaration>
      <ident name="test" />
      <block />
    </function-declaration>
  );

  expect(v1.render()).toBe("function test(){}");
});

test("function-declaration renders correctly without a body", () => {
  // This is only for overloads, it's a bit shaky about how it's actually valid
  // we would need to compare siblings to see if this actually overloads another
  // function because overloads need to be declared next to each other.
  //
  // We could possibly break with typescript's AST here and declarably force something
  // like
  // <function-declaration>
  //   <function-declaration-overload>
  //      ...type params, params and return values
  //   </function-declaration-overload>
  //   <ident name="test" />
  //   ...rest
  //
  const v1 = (
    <function-declaration>
      <ident name="test" />
    </function-declaration>
  );

  expect(v1.render()).toBe("function test()");
});

test("function-declaration renders with parameters", () => {
  const v1 = (
    <function-declaration>
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
    </function-declaration>
  );

  expect(v1.render()).toBe('function test(a,b:string,c:string="hello"){}');
});

test("function-declaration renders with type parameters", () => {
  const v1 = (
    <function-declaration>
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
    </function-declaration>
  );

  expect(v1.render()).toBe('function test<A,B,C>(a,b:B,c:C="hello"){}');
});

test("function-declaration renders with type predicate", () => {
  const v1 = (
    <function-declaration>
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
    </function-declaration>
  );

  expect(v1.render()).toBe(
    'function test<A,B,C>(a,b:B,c:C="hello"):b is string{}'
  );
});

test("function-declaration renders with generator token", () => {
  const v1 = (
    <function-declaration generator={true}>
      <ident name="test" />
      <block />
    </function-declaration>
  );

  expect(v1.render()).toBe("function* test(){}");
});

test("function-declaration renders with named export", () => {
  const v1 = (
    <function-declaration exported="named">
      <ident name="test" />
      <block />
    </function-declaration>
  );

  expect(v1.render()).toBe("export function test(){}");
});

test("function-declaration renders with default export", () => {
  const v1 = (
    <function-declaration exported="default">
      <ident name="test" />
      <block />
    </function-declaration>
  );

  expect(v1.render()).toBe("export default function test(){}");
});

test("function-declaration renders with default export and no name", () => {
  const v1 = (
    <function-declaration exported="default">
      <block />
    </function-declaration>
  );

  expect(v1.render()).toBe("export default function (){}");
});

test("function-declaration throws an error if no name is provided and it is not a default export", () => {
  expect(() => (
    <function-declaration exported="named">
      <block />
    </function-declaration>
  )).toThrow();

  expect(() => (
    <function-declaration>
      <block />
    </function-declaration>
  )).toThrow();
});

test("function-declaration throws an error if generator is specified without a body", () => {
  expect(() => (
    <function-declaration generator={true}>
      <ident name="test" />
    </function-declaration>
  )).toThrow();
});
