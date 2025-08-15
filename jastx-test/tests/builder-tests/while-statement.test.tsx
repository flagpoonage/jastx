import { expect, test } from "vitest";

test("<stmt:while> renders correctly with basic condition", () => {
  const v1 = (
    <stmt:while>
      <ident name="a" />
      <block />
    </stmt:while>
  );

  expect(v1.render()).toBe(`while(a){}`);

  const v2 = (
    <stmt:while>
      <l:boolean value={true} />
      <block />
    </stmt:while>
  );

  expect(v2.render()).toBe(`while(true){}`);

  const v3 = (
    <stmt:while>
      <l:number value={1} />
      <block />
    </stmt:while>
  );

  expect(v3.render()).toBe(`while(1){}`);
});

test("<stmt:while> renders correctly with expression conditions", () => {
  const v = (
    <stmt:while>
      <expr:call>
        <ident name="test" />
      </expr:call>
      <block />
    </stmt:while>
  );

  expect(v.render()).toBe(`while(test()){}`);
});

test("<stmt:while> renders correctly with single statements", () => {
  const v1 = (
    <stmt:while>
      <ident name="a" />
      <stmt:return />
    </stmt:while>
  );
  expect(v1.render()).toBe(`while(a)return`);
});
