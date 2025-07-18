import { InvalidExportedMembersError } from "jastx";
import { expect, test } from "vitest";

test("block renders correctly with variable statements", () => {
  const v = (
    <block>
      <var:statement>
        <var:declaration-list type="const">
          <var:declaration>
            <ident name="x" />
            <t:primitive type="string" />
            <l:string value="Hello" />
          </var:declaration>
        </var:declaration-list>
      </var:statement>
      <var:statement>
        <var:declaration-list type="let">
          <var:declaration>
            <ident name="c" />
          </var:declaration>
        </var:declaration-list>
      </var:statement>
    </block>
  );

  expect(v.render()).toBe('{const x:string="Hello";let c;}');
});

test("block throws an error if it includes exported statements", () => {
  expect(() => (
    <block>
      <var:statement>
        <var:declaration-list type="const">
          <var:declaration>
            <ident name="x" />
            <t:primitive type="string" />
            <l:string value="Hello" />
          </var:declaration>
        </var:declaration-list>
      </var:statement>
      <var:statement exported={true}>
        <var:declaration-list type="let">
          <var:declaration>
            <ident name="c" />
          </var:declaration>
        </var:declaration-list>
      </var:statement>
    </block>
  )).toThrow();
});
