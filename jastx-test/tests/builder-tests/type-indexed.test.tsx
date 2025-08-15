import { expect, test } from "vitest";

test("t:indexed renders correctly with type references", () => {
  const v = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:ref>
        <ident name="X" />
      </t:ref>
    </t:indexed>
  );

  expect(v.render()).toBe("T[X]");
});

test("t:indexed renders correctly with literals", () => {
  const v = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <l:number value={10} />
    </t:indexed>
  );

  expect(v.render()).toBe("T[10]");

  const v2 = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <l:string value={"test"} />
    </t:indexed>
  );

  expect(v2.render()).toBe('T["test"]');
});

test("t:indexed renders correctly with type primitives", () => {
  const v = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:primitive type="string" />
    </t:indexed>
  );

  expect(v.render()).toBe("T[string]");
});

test("t:indexed renders correctly with generic type references", () => {
  const v = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
        <t:primitive type="string" />
      </t:ref>
      <t:primitive type="string" />
    </t:indexed>
  );

  expect(v.render()).toBe("T<string>[string]");
});

test("t:indexed renders correctly with nested indexed types", () => {
  const v = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:indexed>
        <t:ref>
          <ident name="K" />
        </t:ref>
        <t:primitive type="string" />
      </t:indexed>
    </t:indexed>
  );

  expect(v.render()).toBe("T[K[string]]");
});

test("t:indexed renders correctly with nested conditional types", () => {
  const v = (
    <t:indexed>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:cond>
        <t:ref>
          <ident name="A" />
        </t:ref>
        <t:ref>
          <ident name="B" />
        </t:ref>
        <t:ref>
          <ident name="C" />
        </t:ref>
        <t:ref>
          <ident name="D" />
        </t:ref>
      </t:cond>
    </t:indexed>
  );

  expect(v.render()).toBe("T[A extends B?C:D]");
});
