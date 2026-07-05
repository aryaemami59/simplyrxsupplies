import { objectEntries, objectFromEntries } from "../redux/createSelectors.js"
import type { AnyFunction } from "../types/tsHelpers.js"
import { setFunctionName } from "./setFunctionName.js"

/**
 * Assigns each selector function in {@linkcode selectorFunctions} a
 * {@linkcode AnyFunction.name | name} equal to its key in the record, using
 * {@linkcode setFunctionName()}. This makes selector names visible in React
 * DevTools and Redux DevTools traces without requiring manual
 * {@linkcode AnyFunction.name | .name} assignments.
 *
 * @param selectorFunctions - An object whose values are selector functions to be renamed.
 * @returns A new object of the same shape as {@linkcode selectorFunctions} with each function's {@linkcode AnyFunction.name | name} updated.
 */
export const setSelectorNames =
  /**
   * @template SelectorFunctionObject - A record type mapping string keys to functions.
   */
  <const SelectorFunctionObject extends Record<string, AnyFunction>>(
    selectorFunctions: SelectorFunctionObject,
  ): SelectorFunctionObject =>
    objectFromEntries(
      objectEntries(selectorFunctions).map(
        ([selectorName, selectorFunction]) =>
          [
            selectorName,
            setFunctionName(selectorFunction, selectorName),
          ] as const,
      ),
    ) as SelectorFunctionObject
