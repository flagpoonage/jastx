import { expect, test } from "vitest";

test("t:cond renders correctly", () => {
  const v = (
    <t:cond>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <t:ref>
        <ident name="Y" />
      </t:ref>
      <t:ref>
        <ident name="Z" />
      </t:ref>
    </t:cond>
  );

  expect(v.render()).toBe("T extends X?Y:Z");
});

test("t:cond renders nested conditionals", () => {
  const v = (
    <t:cond>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:ref>
        <ident name="X" />
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
      </t:ref>
      <t:ref>
        <ident name="Y" />
      </t:ref>
      <t:ref>
        <ident name="Z" />
      </t:ref>
    </t:cond>
  );

  expect(v.render()).toBe("T extends X<A extends B?C:D>?Y:Z");
});

test("t:cond renders chained conditionals", () => {
  const v = (
    <t:cond>
      <t:ref>
        <ident name="T" />
      </t:ref>
      <t:ref>
        <ident name="X" />
      </t:ref>
      <t:ref>
        <ident name="Y" />
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
    </t:cond>
  );

  expect(v.render()).toBe("T extends X?Y:A extends B?C:D");
});
