import type { AnyFunction } from "../types/tsHelpers"

const setFunctionName = (func: AnyFunction, name: string) => {
  Object.defineProperty(func, "name", { value: name })
}

export default setFunctionName
