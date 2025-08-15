import { expect, test } from "vitest";

test("<export-default> renders correctly with an identifier", () => {
  const v1 = (
    <export-default>
      <ident name="x" />
    </export-default>
  );
  expect(v1.render()).toBe("export default x");
});

test("<export-default> renders correctly with literal values", () => {
  const v1 = (
    <export-default>
      <l:array />
    </export-default>
  );

  expect(v1.render()).toBe("export default []");

  const v2 = (
    <export-default>
      <l:object />
    </export-default>
  );

  expect(v2.render()).toBe("export default {}");

  const v3 = (
    <export-default>
      <l:string value="" />
    </export-default>
  );

  expect(v3.render()).toBe('export default ""');
});
