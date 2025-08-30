import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist";

test("class declaration", () => {
  const x = `class A {}`;
  expect(stringToJastx(x).render()).toBe("class A{}");
});

test("exported class declaration", () => {
  const x = `export class A {}`;
  expect(stringToJastx(x).render()).toBe("export class A{}");
});

test("generic class declaration", () => {
  const x = `export class A<T, B> {}`;
  expect(stringToJastx(x).render()).toBe("export class A<T,B>{}");
});

test("class declaration properties", () => {
  const x = `export class A<T, B> { private readonly name: string = "test";}`;
  expect(stringToJastx(x).render()).toBe(
    'export class A<T,B>{private readonly name:string="test"}'
  );
});

test("extended class declaration", () => {
  const x = `export class A<T, B> extends Q<T, B> implements I<B> { private readonly name: string = "test"; get value () { return this.name } set value(v: string) { this._name = v; } protected makeSomething<T>(a: T): asserts T is string { throw new Error('test');}}`;
  expect(stringToJastx(x).render()).toBe(
    'export class A<T,B> extends Q<T,B> implements I<B>{private readonly name:string="test";get value(){return this.name;};set value(v:string){this._name=v;};protected makeSomething<T>(a:T):asserts T is string{throw new Error("test");}}'
  );
});
