import { useDebugValue, useMemo } from "react"
import { capitalize } from "../../utils/capitalize.js"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"
import { useComponentDidUpdate } from "../useComponentDidUpdate.js"

type UseDependencyChangeLoggerOptions = {
  /**
   * The dependency that we are checking for.
   */
  dependency: unknown

  /**
   * Name of the dependency that we are checking for.
   *
   * @default "Unknown Dependency"
   */
  dependencyName?: string
}

/**
 * Use only in development mode
 *
 * Checks when a single dependency changes and logs the results to the console.
 * @param dependencyObject - An object containing the dependency to check and its name.
 */
export const useDependencyChangeLogger = (
  dependencyObject: UseDependencyChangeLoggerOptions,
): void => {
  const componentName = useMemo(() => inferComponentNameFromStack(), [])

  const { dependency, dependencyName = "Unknown Dependency" } = dependencyObject

  const dependencyType = Array.isArray(dependency)
    ? "Array"
    : capitalize(typeof dependency)

  useComponentDidUpdate(() => {
    console.log(
      `%c${
        dependencyName || "Unknown Dependency"
      }%c ${dependencyType} in ${componentName} Changed: %O`,
      "color:palegreen; font-size: 15px;",
      "",
      dependency,
    )
  }, [componentName, dependencyName, dependencyType, dependency])

  useDebugValue(dependency)
}
