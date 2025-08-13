import { expect, test } from "vitest";

test("<stmt:do-while> renders correctly with basic condition", () => {
  const v1 = (
    <stmt:do-while>
      <block />
      <ident name="a" />
    </stmt:do-while>
  );

  expect(v1.render()).toBe(`do{}while(a)`);

  const v2 = (
    <stmt:do-while>
      <block />
      <l:boolean value={true} />
    </stmt:do-while>
  );

  expect(v2.render()).toBe(`do{}while(true)`);

  const v3 = (
    <stmt:do-while>
      <block />
      <l:number value={1} />
    </stmt:do-while>
  );

  expect(v3.render()).toBe(`do{}while(1)`);
});

test("<stmt:do-while> renders correctly with expression conditions", () => {
  const v = (
    <stmt:do-while>
      <block />
      <expr:call>
        <ident name="test" />
      </expr:call>
    </stmt:do-while>
  );

  expect(v.render()).toBe(`do{}while(test())`);
});

test("<stmt:do-while> throws an error with single statements", () => {
  expect(() => (
    <stmt:do-while>
      <stmt:return />
      <ident name="a" />
    </stmt:do-while>
  )).toThrow();
});
