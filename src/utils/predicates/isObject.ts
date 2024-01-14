import type { UnknownObject } from "../../types/tsHelpers"

const isObject = (value: unknown): value is UnknownObject =>
  value != null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  typeof value !== "function"

export default isObject
