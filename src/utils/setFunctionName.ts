import type { AnyFunction } from "../types/tsHelpers.js"

/**
 * Renames a function by overwriting its read-only
 * {@linkcode AnyFunction.name | name} property via
 * {@linkcode Object.defineProperty | Object.defineProperty()}. This is useful
 * when assigning anonymous or renamed functions to variables where the
 * inferred {@linkcode AnyFunction.name | name} would otherwise be `""` or
 * misleading (e.g. selector functions built with factory helpers).
 *
 * @param functionToRename - The function whose {@linkcode AnyFunction.name | name} property will be updated.
 * @param newFunctionName - The string to assign to the function's {@linkcode AnyFunction.name | name} property.
 * @returns The same {@linkcode functionToRename} reference with an updated {@linkcode AnyFunction.name | name}.
 */
export const setFunctionName =
  /**
   * @template FunctionToRename - The type of the function being renamed.
   */
  <FunctionToRename extends AnyFunction>(
    functionToRename: FunctionToRename,
    newFunctionName: string,
  ): FunctionToRename =>
    Object.defineProperty(functionToRename, "name", {
      value: newFunctionName,
    })
