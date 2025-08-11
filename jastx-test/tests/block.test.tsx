import { expect, test } from "vitest";

test("block renders correctly with variable statements", () => {
  const v = (
    <block>
      <stmt:var>
        <dclr:var-list type="const">
          <dclr:var>
            <ident name="x" />
            <t:primitive type="string" />
            <l:string value="Hello" />
          </dclr:var>
        </dclr:var-list>
      </stmt:var>
      <stmt:var>
        <dclr:var-list type="let">
          <dclr:var>
            <ident name="c" />
          </dclr:var>
        </dclr:var-list>
      </stmt:var>
    </block>
  );

  expect(v.render()).toBe('{const x:string="Hello";let c;}');
});

test("block throws an error if it includes exported statements", () => {
  expect(() => (
    <block>
      <stmt:var>
        <dclr:var-list type="const">
          <dclr:var>
            <ident name="x" />
            <t:primitive type="string" />
            <l:string value="Hello" />
          </dclr:var>
        </dclr:var-list>
      </stmt:var>
      <stmt:var exported={true}>
        <dclr:var-list type="let">
          <dclr:var>
            <ident name="c" />
          </dclr:var>
        </dclr:var-list>
      </stmt:var>
    </block>
  )).toThrow();
});
