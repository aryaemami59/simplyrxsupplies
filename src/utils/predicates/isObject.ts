import type { UnknownObject } from "../../types/tsHelpers.js"

export const isObject = (value: unknown): value is UnknownObject =>
  value != null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  typeof value !== "function"
