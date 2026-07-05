/**
 * Type guard that checks whether {@linkcode value} is a `string`.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} is of type `string`, narrowing the type accordingly.
 */
export const isString = (value: unknown): value is string =>
  typeof value === "string"
