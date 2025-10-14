import type { AnyFunction } from "../types/tsHelpers.js"

export const setFunctionName = <FunctionToRename extends AnyFunction>(
  functionToRename: FunctionToRename,
  newFunctionName: string,
): FunctionToRename =>
  Object.defineProperty(functionToRename, "name", {
    value: newFunctionName,
  })
