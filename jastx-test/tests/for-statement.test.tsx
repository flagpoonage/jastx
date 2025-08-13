import { expect, test } from "vitest";

test("<stmt:for> renders correctly with only a block", () => {
  const v = (
    <stmt:for>
      <block />
    </stmt:for>
  );

  expect(v.render()).toBe(`for(;;){}`);
});

test("<stmt:for> renders correctly with initializer", () => {
  const v1 = (
    <stmt:for>
      <dclr:var-list type="let">
        <dclr:var>
          <ident name="i" />
          <l:number value={0} />
        </dclr:var>
      </dclr:var-list>
      <block />
    </stmt:for>
  );
  expect(v1.render()).toBe(`for(let i=0;;){}`);

  const v2 = (
    <stmt:for>
      <dclr:var-list type="let">
        <dclr:var>
          <ident name="i" />
          <l:number value={0} />
        </dclr:var>
        <dclr:var>
          <ident name="x" />
        </dclr:var>
      </dclr:var-list>
      <block />
    </stmt:for>
  );
  expect(v2.render()).toBe(`for(let i=0,x;;){}`);
});

test("<stmt:for-in> renders correctly with a condition", () => {
  const v1 = (
    <stmt:for>
      <dclr:var-list type="let">
        <dclr:var>
          <ident name="i" />
          <l:number value={0} />
        </dclr:var>
      </dclr:var-list>
      <expr:call>
        <ident name="shouldContinue" />
      </expr:call>
      <block />
    </stmt:for>
  );

  expect(v1.render()).toBe(`for(let i=0;shouldContinue();){}`);
});

test("<stmt:for-in> renders incrementer correctly without a condition", () => {
  const v1 = (
    <stmt:for noCondition={true}>
      <dclr:var-list type="let">
        <dclr:var>
          <ident name="i" />
          <l:number value={0} />
        </dclr:var>
      </dclr:var-list>
      <expr:call>
        <ident name="incrementer" />
      </expr:call>
      <block />
    </stmt:for>
  );

  expect(v1.render()).toBe(`for(let i=0;;incrementer()){}`);
});

test("<stmt:for-in> renders vars, incrementer and condition", () => {
  const v1 = (
    <stmt:for>
      <dclr:var-list type="let">
        <dclr:var>
          <ident name="i" />
          <l:number value={0} />
        </dclr:var>
      </dclr:var-list>
      <expr:call>
        <ident name="shouldContinue" />
      </expr:call>
      <expr:call>
        <ident name="incrementer" />
      </expr:call>
      <block />
    </stmt:for>
  );

  expect(v1.render()).toBe(`for(let i=0;shouldContinue();incrementer()){}`);
});

test("<stmt:for> renders individual statements correctly", () => {
  const v2 = (
    <stmt:for>
      <stmt:return />
    </stmt:for>
  );

  expect(v2.render()).toBe(`for(;;)return`);
});
