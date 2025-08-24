import { expect, test } from "vitest";

test("<t:interface_> renders correctly with only an identifier", () => {
  const v1 = (
    <t:interface_>
      <ident name="Test" />
    </t:interface_>
  );

  expect(v1.render()).toBe("interface Test{}");
});

test("<t:interface_> renders as an exported interface", () => {
  const v1 = (
    <t:interface_ exported>
      <ident name="Test" />
    </t:interface_>
  );

  expect(v1.render()).toBe("export interface Test{}");
});

test("<t:interface_> renders correctly with type parameters", () => {
  const v1 = (
    <t:interface_ exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:param>
        <ident name="Y" />
      </t:param>
    </t:interface_>
  );

  expect(v1.render()).toBe("export interface Test<X,Y>{}");
});

test("<t:interface_> renders with a simple heritage clause", () => {
  const v1 = (
    <t:interface_ exported>
      <ident name="Test" />
      <heritage-clause>
        <ident name="Base" />
      </heritage-clause>
    </t:interface_>
  );

  expect(v1.render()).toBe("export interface Test extends Base{}");
});

test("<t:interface_> renders with generic heritage clause", () => {
  const v1 = (
    <t:interface_ exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause>
        <t:ref>
          <ident name="Base" />
          <t:ref>
            <ident name="X" />
          </t:ref>
        </t:ref>
      </heritage-clause>
    </t:interface_>
  );

  expect(v1.render()).toBe("export interface Test<X> extends Base<X>{}");
});

test("<t:interface_> renders with generic heritage clause", () => {
  const v1 = (
    <t:interface_ exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <heritage-clause>
        <t:ref>
          <ident name="Base" />
          <t:ref>
            <ident name="X" />
          </t:ref>
        </t:ref>
      </heritage-clause>
    </t:interface_>
  );

  expect(v1.render()).toBe("export interface Test<X> extends Base<X>{}");
});

test("<t:interface_> renders simple properties", () => {
  const v = (
    <t:interface_>
      <ident name="Test" />
      <t:property>
        <ident name="x" />
        <t:primitive type="string" />
      </t:property>
      <t:property computed>
        <ident name="aString" />
        <t:primitive type="number" />
      </t:property>
    </t:interface_>
  );

  expect(v.render()).toBe("interface Test{x:string;[aString]:number;}");
});

test("<t:interface_> renders with construct signatures", () => {
  const v = (
    <t:interface_>
      <ident name="Test" />
      <t:construct>
        <t:primitive type="number" />
      </t:construct>
      <t:property>
        <ident name="x" />
        <t:primitive type="string" />
      </t:property>
    </t:interface_>
  );

  expect(v.render()).toBe("interface Test{new():number;x:string;}");
});

test("<t:interface_> renders with index signatures", () => {
  const v = (
    <t:interface_>
      <ident name="Test" />
      <t:index>
        <ident name="k" />
        <t:primitive type="number" />
        <t:ref>
          <ident name="T" />
        </t:ref>
      </t:index>
      <t:property>
        <ident name="x" />
        <t:primitive type="string" />
      </t:property>
    </t:interface_>
  );

  expect(v.render()).toBe("interface Test{[k:number]:T;x:string;}");
});

test("<t:interface_> renders with method signatures", () => {
  const v = (
    <t:interface_>
      <ident name="Test" />
      <t:method>
        <ident name="x" />
        <t:param>
          <ident name="T" />
        </t:param>
        <param>
          <ident name="y" />
          <t:ref>
            <ident name="T" />
          </t:ref>
        </param>
        <t:primitive type="unknown" />
      </t:method>
      <t:property>
        <ident name="y" />
        <t:primitive type="string" />
      </t:property>
    </t:interface_>
  );

  expect(v.render()).toBe("interface Test{x<T>(y:T):unknown;y:string;}");
});
