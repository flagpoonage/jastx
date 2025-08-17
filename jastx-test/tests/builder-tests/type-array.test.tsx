import { expect, test } from "vitest";

test("<t:array> renders correctly with simple types", () => {
  const v1 = (
    <t:array>
      <t:primitive type="string" />
    </t:array>
  );

  expect(v1.render()).toBe("string[]");
});

test("<t:array> renders parenthesis for ambiguous types", () => {
  const v1 = (
    <t:array>
      <t:union>
        <t:primitive type="string" />
        <t:primitive type="number" />
        <t:primitive type="boolean" />
      </t:union>
    </t:array>
  );

  expect(v1.render()).toBe("(string|number|boolean)[]");
  const v2 = (
    <t:array>
      <t:intersection>
        <t:primitive type="string" />
        <t:primitive type="number" />
        <t:primitive type="boolean" />
      </t:intersection>
    </t:array>
  );

  expect(v2.render()).toBe("(string&number&boolean)[]");
  const v3 = (
    <t:array>
      <t:function>
        <t:primitive type="string" />
      </t:function>
    </t:array>
  );

  expect(v3.render()).toBe("(()=>string)[]");
  const v4 = (
    <t:array>
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
    </t:array>
  );

  expect(v4.render()).toBe("(X extends Y?A:B)[]");
});
