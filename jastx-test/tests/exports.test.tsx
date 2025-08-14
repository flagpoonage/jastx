import { expect, test } from "vitest";

test("<export-specifier> renders correctly as an identifier", () => {
  const v1 = (
    <export-specifier>
      <ident name="a" />
    </export-specifier>
  );
  expect(v1.render()).toBe("a");
});

test("<export-specifier> renders correctly with an alias", () => {
  const v1 = (
    <export-specifier>
      <ident name="a" />
      <ident name="b" />
    </export-specifier>
  );
  expect(v1.render()).toBe("a as b");
});

test("<export-specifier> renders correctly as type only", () => {
  const v1 = (
    <export-specifier typeOnly>
      <ident name="a" />
    </export-specifier>
  );
  expect(v1.render()).toBe("type a");

  const v2 = (
    <export-specifier typeOnly>
      <ident name="a" />
      <ident name="b" />
    </export-specifier>
  );
  expect(v2.render()).toBe("type a as b");
});

test("<named-exports> renders correctly with a single export specifier", () => {
  const v1 = (
    <named-exports>
      <export-specifier>
        <ident name="a" />
      </export-specifier>
    </named-exports>
  );
  expect(v1.render()).toBe("{a}");
});

test("<named-exports> renders correctly with just an identifier", () => {
  const v1 = (
    <named-exports>
      <ident name="a" />
    </named-exports>
  );
  expect(v1.render()).toBe("{a}");
});

test("<named-exports> renders correctly with multiple exports", () => {
  const v1 = (
    <named-exports>
      <ident name="a" />
      <export-specifier>
        <ident name="b" />
      </export-specifier>
    </named-exports>
  );
  expect(v1.render()).toBe("{a,b}");
});

test("<named-exports> renders correctly with mixed type and non-type exports", () => {
  const v1 = (
    <named-exports>
      <ident name="a" />
      <export-specifier typeOnly>
        <ident name="b" />
      </export-specifier>
      <export-specifier>
        <ident name="c" />
      </export-specifier>
    </named-exports>
  );
  expect(v1.render()).toBe("{a,type b,c}");
});

test("<namespace-export> renders correctly with a single alias", () => {
  const v1 = (
    <namespace-export>
      <ident name="a" />
    </namespace-export>
  );
  expect(v1.render()).toBe("* as a");
});

test("<dclr:export> renders by default as a non-aliased namespace", () => {
  const v1 = (
    <dclr:export>
      <l:string value="./test" />
    </dclr:export>
  );
  expect(v1.render()).toBe('export * from "./test"');
});

test("<dclr:export> renders correctly as type-only", () => {
  const v1 = (
    <dclr:export typeOnly>
      <l:string value="./test" />
    </dclr:export>
  );
  expect(v1.render()).toBe('export type * from "./test"');
});

test("<dclr:export> renders correctly with named-exports", () => {
  const v1 = (
    <dclr:export>
      <named-exports>
        <ident name="a" />
        <export-specifier typeOnly>
          <ident name="b" />
        </export-specifier>
      </named-exports>
      <l:string value="./test" />
    </dclr:export>
  );
  expect(v1.render()).toBe('export {a,type b} from "./test"');
});

test("<dclr:export> renders correctly with a namespace export alias", () => {
  const v1 = (
    <dclr:export>
      <namespace-export>
        <ident name="X" />
      </namespace-export>
      <l:string value="./test" />
    </dclr:export>
  );
  expect(v1.render()).toBe('export * as X from "./test"');
});

test("<dclr:export> renders without a source if named-exports are used", () => {
  const v1 = (
    <dclr:export>
      <named-exports>
        <ident name="a" />
        <export-specifier typeOnly>
          <ident name="b" />
        </export-specifier>
      </named-exports>
    </dclr:export>
  );
  expect(v1.render()).toBe("export {a,type b}");
});
