import { expect, test } from "vitest";

test("<stmt:for-in> renders correctly with defaults", () => {
  const v = (
    <stmt:for-in>
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-in>
  );

  expect(v.render()).toBe(`for(a in b){}`);
});

test("<stmt:for-in> renders correctly with other variable kinds", () => {
  const v = (
    <stmt:for-in variableType="const">
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-in>
  );

  expect(v.render()).toBe(`for(const a in b){}`);

  const v1 = (
    <stmt:for-in variableType="let">
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-in>
  );
  expect(v1.render()).toBe(`for(let a in b){}`);

  const v2 = (
    <stmt:for-in variableType="var">
      <ident name="a" />
      <ident name="b" />
      <block />
    </stmt:for-in>
  );

  expect(v2.render()).toBe(`for(var a in b){}`);
});

test("<stmt:for-in> renders blocks correctly", () => {
  const v2 = (
    <stmt:for-in variableType="var">
      <ident name="a" />
      <ident name="b" />
      <block>
        <stmt:return />
      </block>
    </stmt:for-in>
  );

  expect(v2.render()).toBe(`for(var a in b){return;}`);
});

test("<stmt:for-in> renders individual statements correctly", () => {
  const v2 = (
    <stmt:for-in variableType="var">
      <ident name="a" />
      <ident name="b" />
      <stmt:return />
    </stmt:for-in>
  );

  expect(v2.render()).toBe(`for(var a in b)return`);
});
