import { expect, test } from "vitest";

test("<stmt:for-of> renders correctly with defaults", () => {
  const v = (
    <stmt:for-of>
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-of>
  );

  expect(v.render()).toBe(`for(a of b){}`);
});

test("<stmt:for-of> renders correctly with await", () => {
  const v = (
    <stmt:for-of await>
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-of>
  );

  expect(v.render()).toBe(`for await(a of b){}`);
});

test("<stmt:for-of> renders correctly with other variable kinds", () => {
  const v = (
    <stmt:for-of variableType="const">
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-of>
  );

  expect(v.render()).toBe(`for(const a of b){}`);

  const v1 = (
    <stmt:for-of variableType="let">
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-of>
  );
  expect(v1.render()).toBe(`for(let a of b){}`);

  const v2 = (
    <stmt:for-of variableType="var">
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-of>
  );

  expect(v2.render()).toBe(`for(var a of b){}`);
});

test("<stmt:for-of> renders blocks correctly", () => {
  const v2 = (
    <stmt:for-of variableType="var">
      <ident name="a" />
      <ident name="b" />
      <block>
        <stmt:return />
      </block>
    </stmt:for-of>
  );

  expect(v2.render()).toBe(`for(var a of b){return;}`);
});

test("<stmt:for-of> renders individual statements correctly", () => {
  const v2 = (
    <stmt:for-of variableType="var">
      <ident name="a" />
      <ident name="b" />
      <stmt:return />
    </stmt:for-of>
  );

  expect(v2.render()).toBe(`for(var a of b)return`);
});
