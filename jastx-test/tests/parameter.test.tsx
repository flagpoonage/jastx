import { expect, test } from "vitest";

test("param renders correctly with just a name", () => {
  const v = (
    <param>
      <ident name="test" />
    </param>
  );
  expect(v.render()).toBe("test");
});

test("param throws with no children", () => {
  expect(() => <param />).toThrowError();
});

test("param renders correctly with type", () => {
  const v = (
    <param>
      <ident name="test" />
      <t:primitive type="string" />
    </param>
  );
  expect(v.render()).toBe("test:string");
});

test("param renders correctly with array binding", () => {
  const v = (
    <param>
      <bind:array>
        <ident name="a" />
        <bind:array-elem>
          <ident name="b" />
          <l:number value={10} />
        </bind:array-elem>
      </bind:array>
      <t:primitive type="string" />
    </param>
  );
  expect(v.render()).toBe("[a,b=10]:string");
});

test("param allows optional parameters", () => {
  const v = (
    <param modifier="optional">
      <ident name="test" />
      <t:primitive type="string" />
    </param>
  );
  expect(v.render()).toBe("test?:string");
});
