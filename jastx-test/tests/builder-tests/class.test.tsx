import { expect, test } from "vitest";

test("<dclr:class> renders as a simple class", () => {
  const v1 = (
    <dclr:class>
      <ident name="Test" />
    </dclr:class>
  );

  expect(v1.render()).toBe("class Test{}");
});

test("<dclr:class> throws without an identifier", () => {
  expect(() => (
    <dclr:class>
      <method>
        <ident name="x" />
      </method>
    </dclr:class>
  )).toThrow();
});

test("<dclr:class> renders with type parameters", () => {
  const v1 = (
    <dclr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
    </dclr:class>
  );

  expect(v1.render()).toBe("class Test<X>{}");
});

test("<dclr:class> renders with an extends heritage clause", () => {
  const v1 = (
    <dclr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause>
        <ident name="Base" />
      </heritage-clause>
    </dclr:class>
  );

  expect(v1.render()).toBe("class Test<X> extends Base{}");
});

test("<dclr:class> renders with an implements heritage clause", () => {
  const v1 = (
    <dclr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="implements">
        <ident name="Base" />
      </heritage-clause>
    </dclr:class>
  );

  expect(v1.render()).toBe("class Test<X> implements Base{}");
});

test("<dclr:class> renders with both an extends and implements heritage clause", () => {
  const v1 = (
    <dclr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
    </dclr:class>
  );

  expect(v1.render()).toBe("class Test<X> extends Base implements Root{}");
});

test("<dclr:class> throws with multiple extends, or multiple implements clauses", () => {
  expect(() => (
    <dclr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="extends">
        <ident name="Root" />
      </heritage-clause>
    </dclr:class>
  )).toThrow();

  expect(() => (
    <dclr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="implements">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
    </dclr:class>
  )).toThrow();
});

test("<dclr:class> as an export", () => {
  const v1 = (
    <dclr:class exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
    </dclr:class>
  );

  expect(v1.render()).toBe(
    "export class Test<X> extends Base implements Root{}"
  );
});

test("<dclr:class> renders with various property types", () => {
  const v1 = (
    <dclr:class exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
      <field modifier="private">
        <ident name="_x" />
        <l:string value="initial_value" />
      </field>
      <get-accessor>
        <ident name="x" />
        <block>
          <stmt:return>
            <expr:prop-access>
              <ident name="this" />
              <ident name="_x" />
            </expr:prop-access>
          </stmt:return>
        </block>
      </get-accessor>
      <set-accessor>
        <ident name="x" />
        <param>
          <ident name="value" />
          <t:primitive type="string" />
        </param>
        <block>
          <stmt:expr>
            <expr:binary operator="=">
              <expr:prop-access>
                <ident name="this" />
                <ident name="_x" />
              </expr:prop-access>
              <ident name="value" />
            </expr:binary>
          </stmt:expr>
        </block>
      </set-accessor>
      <method>
        <ident name="reset" />
        <block>
          <stmt:expr>
            <expr:binary operator="=">
              <expr:prop-access>
                <ident name="this" />
                <ident name="_x" />
              </expr:prop-access>
              <l:string value="" />
            </expr:binary>
          </stmt:expr>
        </block>
      </method>
    </dclr:class>
  );

  expect(v1.render()).toBe(
    'export class Test<X> extends Base implements Root{private _x="initial_value";get x(){return this._x;};set x(value:string){this._x=value;};reset(){this._x="";}}'
  );
});

test("<expr:class> renders as a simple class", () => {
  const v1 = (
    <expr:class>
      <ident name="Test" />
    </expr:class>
  );

  expect(v1.render()).toBe("class Test{}");
});

test("<expr:class> allows an anonymous class", () => {
  const v1 = (
    <expr:class>
      <method>
        <ident name="x" />
        <block />
      </method>
    </expr:class>
  );

  expect(v1.render()).toBe("class {x(){}}");
});

test("<expr:class> renders with type parameters", () => {
  const v1 = (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
    </expr:class>
  );

  expect(v1.render()).toBe("class Test<X>{}");
});

test("<expr:class> renders with an extends heritage clause", () => {
  const v1 = (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause>
        <ident name="Base" />
      </heritage-clause>
    </expr:class>
  );

  expect(v1.render()).toBe("class Test<X> extends Base{}");
});

test("<expr:class> renders with an implements heritage clause", () => {
  const v1 = (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="implements">
        <ident name="Base" />
      </heritage-clause>
    </expr:class>
  );

  expect(v1.render()).toBe("class Test<X> implements Base{}");
});

test("<expr:class> renders with both an extends and implements heritage clause", () => {
  const v1 = (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
    </expr:class>
  );

  expect(v1.render()).toBe("class Test<X> extends Base implements Root{}");
});

test("<expr:class> throws with multiple extends, or multiple implements clauses", () => {
  expect(() => (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="extends">
        <ident name="Root" />
      </heritage-clause>
    </expr:class>
  )).toThrow();

  expect(() => (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="implements">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
    </expr:class>
  )).toThrow();
});

test("<expr:class> renders with various property types", () => {
  const v1 = (
    <expr:class>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause kind="extends">
        <ident name="Base" />
      </heritage-clause>
      <heritage-clause kind="implements">
        <ident name="Root" />
      </heritage-clause>
      <field modifier="private">
        <ident name="_x" />
        <l:string value="initial_value" />
      </field>
      <get-accessor>
        <ident name="x" />
        <block>
          <stmt:return>
            <expr:prop-access>
              <ident name="this" />
              <ident name="_x" />
            </expr:prop-access>
          </stmt:return>
        </block>
      </get-accessor>
      <set-accessor>
        <ident name="x" />
        <param>
          <ident name="value" />
          <t:primitive type="string" />
        </param>
        <block>
          <stmt:expr>
            <expr:binary operator="=">
              <expr:prop-access>
                <ident name="this" />
                <ident name="_x" />
              </expr:prop-access>
              <ident name="value" />
            </expr:binary>
          </stmt:expr>
        </block>
      </set-accessor>
      <method>
        <ident name="reset" />
        <block>
          <stmt:expr>
            <expr:binary operator="=">
              <expr:prop-access>
                <ident name="this" />
                <ident name="_x" />
              </expr:prop-access>
              <l:string value="" />
            </expr:binary>
          </stmt:expr>
        </block>
      </method>
    </expr:class>
  );

  expect(v1.render()).toBe(
    'class Test<X> extends Base implements Root{private _x="initial_value";get x(){return this._x;};set x(value:string){this._x=value;};reset(){this._x="";}}'
  );
});
