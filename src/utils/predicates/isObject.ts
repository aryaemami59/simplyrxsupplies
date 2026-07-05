import type { UnknownObject } from "../../types/tsHelpers.js"

/**
 * Type guard that checks whether {@linkcode value} is a plain object - i.e.
 * non-null, not an array, and not a function. Narrows the type to
 * {@linkcode UnknownObject} (`Record<string, unknown>`).
 *
 * @param value - The value to check.
 * @returns `true` when {@linkcode value} is a plain object.
 */
export const isObject = (value: unknown): value is UnknownObject =>
  value != null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  typeof value !== "function"
