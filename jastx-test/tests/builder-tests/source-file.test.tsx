import { expect, test } from "vitest";

test("source-file renders statements correctly", () => {
  const v1 = (
    <source-file type="module">
      <dclr:import>
        <named-imports>
          <ident name="getValue" />
        </named-imports>
        <l:string value="./value-getter" />
      </dclr:import>
      <stmt:var>
        <dclr:var-list type="const">
          <dclr:var>
            <ident name="outputValue" />
            <expr:call>
              <ident name="getValue" />
            </expr:call>
          </dclr:var>
        </dclr:var-list>
      </stmt:var>
      <dclr:export>
        <named-exports>
          <ident name="outputValue" />
        </named-exports>
      </dclr:export>
    </source-file>
  );

  expect(v1.render()).toBe(
    'import {getValue} from "./value-getter";const outputValue=getValue();export {outputValue}'
  );
});
