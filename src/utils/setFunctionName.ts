import type { AnyFunction } from "../types/tsHelpers"

export const setFunctionName = (func: AnyFunction, name: string) => {
  Object.defineProperty(func, "name", { value: name })
}
