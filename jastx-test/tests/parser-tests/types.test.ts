import { expect, test } from "vitest";
import { stringToJastx } from "../../../jastx-parse/dist/parse";

test("type alias", () => {
  const x1 = `type T = string`;
  expect(stringToJastx(x1).render()).toBe(`type T=string`);
});

test("generic type alias", () => {
  const x1 = `type T<K> = Record<string, K>`;
  expect(stringToJastx(x1).render()).toBe(`type T<K>=Record<string,K>`);
});

test("exported type alias", () => {
  const x1 = `export type T = string`;
  expect(stringToJastx(x1).render()).toBe(`export type T=string`);
});

test("conditional type alias", () => {
  const x1 = `type T<K> = K extends string ? Record<string, string> : Record<string, never>`;
  expect(stringToJastx(x1).render()).toBe(
    `type T<K>=K extends string?Record<string,string>:Record<string,never>`
  );
});

test("inference type alias", () => {
  const x1 = `type T<K> = K extends Set<infer X> ? X : never`;
  expect(stringToJastx(x1).render()).toBe(
    `type T<K>=K extends Set<infer X>?X:never`
  );
});

test("interface", () => {
  const x1 = `interface X { name: string, opt?: string; [comp]: string; }`;
  expect(stringToJastx(x1).render()).toBe(
    `interface X{name:string;opt?:string;[comp]:string;}`
  );
});

test("exported interface", () => {
  const x1 = `export interface X { name: string, opt?: string; [comp]: string; }`;
  expect(stringToJastx(x1).render()).toBe(
    `export interface X{name:string;opt?:string;[comp]:string;}`
  );
});

test("generic interface", () => {
  const x1 = `export interface X<T> { name: T, opt?: string; [comp]: string; }`;
  expect(stringToJastx(x1).render()).toBe(
    `export interface X<T>{name:T;opt?:string;[comp]:string;}`
  );
});

test("extending interface", () => {
  const x1 = `export interface X<T> extends K<T> { name: T, opt?: string; [comp]: string; }`;
  expect(stringToJastx(x1).render()).toBe(
    `export interface X<T>{name:T;opt?:string;[comp]:string;}`
  );
});
