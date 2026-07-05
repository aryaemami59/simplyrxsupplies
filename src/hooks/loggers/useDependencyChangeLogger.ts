import { useDebugValue, useMemo } from "react"
import { capitalize } from "../../utils/capitalize.js"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"
import { useComponentDidUpdate } from "../useComponentDidUpdate.js"

type UseDependencyChangeLoggerOptions = {
  /**
   * The dependency value to watch for changes.
   */
  dependency: unknown

  /**
   * Human-readable name of the dependency shown in the console log.
   *
   * @default "Unknown Dependency"
   */
  dependencyName?: string
}

/**
 * Logs a styled console message whenever a single dependency value changes,
 * including the dependency's current value and its runtime type.
 * The component name is inferred automatically via
 * {@linkcode inferComponentNameFromStack()}.
 *
 * **Note**: Use only in development mode.
 *
 * @param dependencyObject - An object containing the dependency to watch and its display name.
 *
 * @example
 * <caption>Watch a prop for changes</caption>
 *
 * ```tsx
 * import { useDependencyChangeLogger } from "../../hooks/loggers/useDependencyChangeLogger.js";
 *
 * export const Example = ({ count }: { count: number }) => {
 *   useDependencyChangeLogger({
 *     dependency: count,
 *     dependencyName: "count",
 *   });
 *
 *   return <div>Count: {count}</div>;
 * };
 * ```
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
