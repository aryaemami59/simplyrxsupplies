import { useDebugValue } from "react"
import { capitalize } from "../../utils/capitalize.js"
import { useComponentDidUpdate } from "../useComponentDidUpdate.js"

/**
 * Use only in development mode
 *
 * Checks when a single dependency changes and logs the results to the console.
 * @param dependency - The dependency that we are checking for.
 * @param depName - Name of the dependency that we are checking for.
 */
export const useDependencyChangeLogger = (
  dependency: unknown,
  depName = "",
) => {
  const componentName =
    new Error().stack?.split("\n")[2]?.split(" ")[5] ?? "Component"

  const depType = Array.isArray(dependency)
    ? "Array"
    : capitalize(typeof dependency)

  useDebugValue([depName, dependency] as const, value => value)

  useComponentDidUpdate(() => {
    console.log(
      `%c${
        depName || "Unknown Dependency"
      }%c ${depType} in ${componentName} Changed: %O`,
      "color:palegreen; font-size: 15px;",
      "",
      dependency,
    )
  }, [componentName, depName, depType, dependency])
}
