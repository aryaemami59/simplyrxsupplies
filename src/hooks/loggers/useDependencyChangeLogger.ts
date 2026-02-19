import { useDebugValue, useMemo } from "react"
import { capitalize } from "../../utils/capitalize.js"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"
import { useComponentDidUpdate } from "../useComponentDidUpdate.js"

/**
 * Use only in development mode
 *
 * Checks when a single dependency changes and logs the results to the console.
 * @param dependency - The dependency that we are checking for.
 * @param depName - Name of the dependency that we are checking for.
 */
export const useDependencyChangeLogger = (dependencyObject: {
  dependency: unknown
  dependencyName?: string
}) => {
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
