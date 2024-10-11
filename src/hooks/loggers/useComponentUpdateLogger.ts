import { useDebugValue, useRef } from "react"
import { useComponentDidUpdate } from "../useComponentDidUpdate"

/**
 * Use only in development mode
 *
 * Counts how many times the component re-renders and logs the results to the console.
 */
export const useComponentUpdateLogger = () => {
  const componentName =
    new Error().stack?.split("\n")[2]?.split(" ")[5] ?? "Component"
  const renderCount = useRef(0)

  useDebugValue([componentName, renderCount.current], value => value)

  useComponentDidUpdate(() => {
    renderCount.current += 1
    console.log(
      `%c${componentName}%c Re-rendered %c${renderCount.current.toString()}%c ${
        renderCount.current === 1 ? "time" : "times"
      }`,
      "color: violet; font-size: 15px;",
      "",
      "color: violet; font-size: 15px;",
      "",
    )
  })
}
