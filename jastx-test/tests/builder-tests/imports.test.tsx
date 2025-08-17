import { expect, test } from "vitest";

test("<import-specifier> renders correctly as an identifier", () => {
  const v1 = (
    <import-specifier>
      <ident name="a" />
    </import-specifier>
  );
  expect(v1.render()).toBe("a");
});

test("<import-specifier> renders correctly with an alias", () => {
  const v1 = (
    <import-specifier>
      <ident name="a" />
      <ident name="b" />
    </import-specifier>
  );
  expect(v1.render()).toBe("a as b");
});

test("<import-specifier> renders correctly as type only", () => {
  const v1 = (
    <import-specifier typeOnly>
      <ident name="a" />
    </import-specifier>
  );
  expect(v1.render()).toBe("type a");

  const v2 = (
    <import-specifier typeOnly>
      <ident name="a" />
      <ident name="b" />
    </import-specifier>
  );
  expect(v2.render()).toBe("type a as b");
});

test("<named-imports> renders correctly with a single import specifier", () => {
  const v1 = (
    <named-imports>
      <import-specifier>
        <ident name="a" />
      </import-specifier>
    </named-imports>
  );
  expect(v1.render()).toBe("{a}");
});

test("<named-imports> renders correctly with just an identifier", () => {
  const v1 = (
    <named-imports>
      <ident name="a" />
    </named-imports>
  );
  expect(v1.render()).toBe("{a}");
});

test("<named-imports> renders correctly with multiple imports", () => {
  const v1 = (
    <named-imports>
      <ident name="a" />
      <import-specifier>
        <ident name="b" />
      </import-specifier>
    </named-imports>
  );
  expect(v1.render()).toBe("{a,b}");
});

test("<named-imports> renders correctly with mixed type and non-type imports", () => {
  const v1 = (
    <named-imports>
      <ident name="a" />
      <import-specifier typeOnly>
        <ident name="b" />
      </import-specifier>
      <import-specifier>
        <ident name="c" />
      </import-specifier>
    </named-imports>
  );
  expect(v1.render()).toBe("{a,type b,c}");
});

test("<namespace-import> renders correctly with a single alias", () => {
  const v1 = (
    <namespace-import>
      <ident name="a" />
    </namespace-import>
  );
  expect(v1.render()).toBe("* as a");
});

test("<dclr:import> renders correctly with named-imports", () => {
  const v1 = (
    <dclr:import>
      <named-imports>
        <ident name="a" />
        <import-specifier typeOnly>
          <ident name="b" />
        </import-specifier>
      </named-imports>
      <l:string value="./test" />
    </dclr:import>
  );
  expect(v1.render()).toBe('import {a,type b} from "./test"');
});

test("<dclr:import> renders correctly with a namespace import alias", () => {
  const v1 = (
    <dclr:import>
      <namespace-import>
        <ident name="X" />
      </namespace-import>
      <l:string value="./test" />
    </dclr:import>
  );
  expect(v1.render()).toBe('import * as X from "./test"');
});

test("<dclr:import> renders correctly with both a default import and named imports", () => {
  const v1 = (
    <dclr:import>
      <ident name="X" />
      <named-imports>
        <ident name="a" />
        <import-specifier typeOnly>
          <ident name="b" />
        </import-specifier>
      </named-imports>
      <l:string value="./test" />
    </dclr:import>
  );
  expect(v1.render()).toBe('import X,{a,type b} from "./test"');
});

test("<dclr:import> renders correctly with both a default import and a namespace import", () => {
  const v1 = (
    <dclr:import>
      <ident name="X" />
      <namespace-import>
        <ident name="Q" />
      </namespace-import>
      <l:string value="./test" />
    </dclr:import>
  );
  expect(v1.render()).toBe('import X,* as Q from "./test"');
});

test("<dclr:import> renders correctly with import attributes", () => {
  const v1 = (
    <dclr:import>
      <ident name="X" />
      <namespace-import>
        <ident name="Q" />
      </namespace-import>
      <l:string value="./test" />
      <import-attribute>
        <ident name="type" />
        <l:string value="json" />
      </import-attribute>
    </dclr:import>
  );
  expect(v1.render()).toBe('import X,* as Q from "./test" with {type:"json"}');
});
