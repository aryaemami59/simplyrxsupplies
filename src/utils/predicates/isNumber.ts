/**
 * Type guard that checks whether {@linkcode value} is a `number`.
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} is of type `number`, narrowing the type accordingly.
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number"
