import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("ifs", () => {
  const x = `if (x === 10) { console?.log?.(a); x[10](a); x?.[10]?.(a); x['ter'](a); } else if (x === 5) { return 'x'; } else { restart(); }`;
  expect(stringToJastx(x).render()).toBe(
    `if(x === 10){console?.log?.(a);x[10](a);x?.[10]?.(a);x["ter"](a);}else if(x === 5){return "x";}else{restart();}`
  );
});

console?.log?.();
