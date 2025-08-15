import { expect, test } from "vitest";

test("dclr:var renders correctly with just a name", () => {
  const v = (
    <dclr:var>
      <ident name="test" />
    </dclr:var>
  );
  expect(v.render()).toBe("test");
});

test("dclr:var throws with no children", () => {
  expect(() => <dclr:var />).toThrowError();
});

test("dclr:var renders correctly with type", () => {
  const v = (
    <dclr:var>
      <ident name="test" />
      <t:primitive type="string" />
    </dclr:var>
  );
  expect(v.render()).toBe("test:string");
});

test("dclr:var renders correctly with array binding", () => {
  const v = (
    <dclr:var>
      <bind:array>
        <ident name="a" />
        <bind:array-elem>
          <ident name="b" />
          <l:number value={10} />
        </bind:array-elem>
      </bind:array>
      <t:primitive type="string" />
    </dclr:var>
  );
  expect(v.render()).toBe("[a,b=10]:string");
});
