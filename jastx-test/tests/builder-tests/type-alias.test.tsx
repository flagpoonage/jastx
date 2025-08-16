import { expect, test } from "vitest";

test("<t:alias> renders correctly with only an identifier", () => {
  const v1 = (
    <t:alias>
      <ident name="Test" />
      <t:primitive type="string" />
    </t:alias>
  );

  expect(v1.render()).toBe("type Test=string");
});

test("<t:alias> renders as an exported interface", () => {
  const v1 = (
    <t:alias exported> 
      <ident name="Test" />
      <t:primitive type="string" />
    </t:alias>
  );

  expect(v1.render()).toBe("export type Test=string");
});

test("<t:alias> renders correctly with type parameters", () => {
  const v1 = (
    <t:alias exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:param>
        <ident name="Y" />
      </t:param>
      <t:primitive type="string" />
    </t:alias>
  );

  expect(v1.render()).toBe("export type Test<X,Y>=string");
});

test("<t:alias> renders with complex conditionals", () => {
  const v1 = (
    <t:alias exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:cond>
        <t:ref>
          <ident name="X" />
        </t:ref>
        <t:ref>
          <ident name="Y" />
        </t:ref>
        <t:ref>
          <ident name="A" />
        </t:ref>
        <t:ref>
          <ident name="B" />
        </t:ref>
      </t:cond>
    </t:alias>
  );

  expect(v1.render()).toBe("export type Test<X>=X extends Y?A:B");
});

test("<t:alias> renders with infer types", () => {
  const v1 = (
    <t:alias exported>
      <ident name="Test" />
      <t:param>
        <ident name="X" />
      </t:param>
      <t:cond>
        <t:ref>
          <ident name="X" />
        </t:ref>
        <t:literal>
          <t:property>
            <ident name="prop" />
            <t:infer>
              <t:param>
                <ident name="A" />
              </t:param>
            </t:infer>
          </t:property>
        </t:literal>
        <t:ref>
          <ident name="A" />
        </t:ref>
        <t:ref>
          <ident name="B" />
        </t:ref>
      </t:cond>
    </t:alias>
  );

  expect(v1.render()).toBe("export type Test<X>=X extends {prop:infer A;}?A:B");
});
