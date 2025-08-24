import { stringToJastx } from "jastx-parse";
import { expect, test } from "vitest";

test("for loops", () => {
  const w = `for (let i = 0; i < 10; i++) { if (t[i]) { return; } }`;
  expect(stringToJastx(w).render()).toBe(
    `for(let i=0;i<10;i++){if(t[i]){return;};}`
  );
  const x = `for (let i = 0; i < 10; i--) { if (t[i]) { return; } }`;
  expect(stringToJastx(x).render()).toBe(
    `for(let i=0;i<10;i--){if(t[i]){return;};}`
  );
  const y = `for (let i = 0; i < 10; ++i) { if (t[i]) { return; } }`;
  expect(stringToJastx(y).render()).toBe(
    `for(let i=0;i<10;++i){if(t[i]){return;};}`
  );
  const z = `for (let i = 0; i < 10; --i) { if (t[i]) { return; } }`;
  expect(stringToJastx(z).render()).toBe(
    `for(let i=0;i<10;--i){if(t[i]){return;};}`
  );
});

test("for-of loops", () => {
  const x = `for (const i of t) { if (i) { return; } }`;
  expect(stringToJastx(x).render()).toBe(`for(const i of t){if(i){return;};}`);
  const y = `for (i of t) { if (i) { return; } }`;
  expect(stringToJastx(y).render()).toBe(`for(i of t){if(i){return;};}`);
  const z = `for await (i of t) { if (i) { return; } }`;
  expect(stringToJastx(z).render()).toBe(`for await(i of t){if(i){return;};}`);
});

test("for-in loops", () => {
  const x = `for (const i in t) { if (i) { return; } }`;
  expect(stringToJastx(x).render()).toBe(`for(const i in t){if(i){return;};}`);
});

test("while loop", () => {
  const x = `while (a > b) { doSomething((a as string).toString()); }`;
  expect(stringToJastx(x).render()).toBe(
    `while(a>b){doSomething((a as string).toString());}`
  );
});

test("do-while loop", () => {
  const x = `do { doSomething((a as string).toString()); } while (a > b)`;
  expect(stringToJastx(x).render()).toBe(
    `do{doSomething((a as string).toString());}while(a>b)`
  );
});
