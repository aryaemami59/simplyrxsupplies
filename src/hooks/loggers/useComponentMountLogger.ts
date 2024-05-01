import { useDebugValue, useEffect } from "react"

/**
 * Use only in development mode
 *
 * Checks when component mounts and unmounts and logs the results to the console.
 */
export const useComponentMountLogger = () => {
  const componentName =
    new Error().stack?.split("\n")[2]?.split(" ")[5] ?? "Component"

  useDebugValue(componentName, value => value)

  useEffect(() => {
    console.log(
      `%c${componentName}%c Mounted`,
      "color: aqua; font-size: 15px;",
      "",
    )
    return () => {
      console.log(
        `%c${componentName}%c Unmounted`,
        "color: aqua; font-size: 15px;",
        "",
      )
    }
  }, [componentName])
}
