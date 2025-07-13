export function asArray<T>(v: T | T[]): T[] {
  return Array.isArray(v) ? v : [v];
}
