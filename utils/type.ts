function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function hasProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, unknown> {
  return isObject(obj) && prop in obj;
}
