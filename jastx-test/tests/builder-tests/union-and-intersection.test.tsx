import { expect, test } from "vitest";

test("<t:union> renders correctly", () => {
  const v1 = (
    <t:union>
      <t:primitive type="string" />
      <t:primitive type="number" />
      <t:primitive type="boolean" />
    </t:union>
  );

  expect(v1.render()).toBe("string|number|boolean");
});

test("<t:intersection> renders correctly", () => {
  const v1 = (
    <t:intersection>
      <t:primitive type="string" />
      <t:primitive type="number" />
      <t:primitive type="boolean" />
    </t:intersection>
  );

  expect(v1.render()).toBe("string&number&boolean");
});

test("<t:union> renders intersections without parenthesis", () => {
  const v1 = (
    <t:union>
      <t:primitive type="string" />
      <t:intersection>
        <t:primitive type="number" />
        <t:primitive type="boolean" />
      </t:intersection>
    </t:union>
  );

  expect(v1.render()).toBe("string|number&boolean");
});

test("<t:intersection> renders unions with parenthesis", () => {
  const v1 = (
    <t:intersection>
      <t:primitive type="string" />
      <t:union>
        <t:primitive type="number" />
        <t:primitive type="boolean" />
      </t:union>
    </t:intersection>
  );

  expect(v1.render()).toBe("string&(number|boolean)");
});

test("<t:union> parenthesizes functions", () => {
  const v1 = (
    <t:union>
      <t:function>
        <t:primitive type="string" />
      </t:function>
      <t:primitive type="string" />
    </t:union>
  );

  expect(v1.render()).toBe("(()=>string)|string");
});

test("<t:intersection> parenthesizes functions", () => {
  const v1 = (
    <t:intersection>
      <t:function>
        <t:primitive type="string" />
      </t:function>
      <t:primitive type="string" />
    </t:intersection>
  );

  expect(v1.render()).toBe("(()=>string)&string");
});
