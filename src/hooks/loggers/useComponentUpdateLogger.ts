import type { PropertiesHyphen } from "csstype"
import { useDebugValue, useMemo, useRef } from "react"
import type { Simplify } from "../../types/tsHelpers.js"
import { useComponentDidUpdate } from "../useComponentDidUpdate.js"

type ComponentLoggerOptions = {
  componentNameStyle?: Simplify<PropertiesHyphen>
  renderCountStyle?: Simplify<PropertiesHyphen>
}

const DEFAULT_COMPONENT_NAME_STYLE = {
  color: "violet",
  "font-size": "15px",
} as const satisfies PropertiesHyphen

const DEFAULT_RENDER_COUNT_STYLE = {
  color: "violet",
  "font-size": "15px",
} as const satisfies PropertiesHyphen

const DEFAULT_OPTIONS = {
  componentNameStyle: DEFAULT_COMPONENT_NAME_STYLE,
  renderCountStyle: DEFAULT_RENDER_COUNT_STYLE,
} as const satisfies ComponentLoggerOptions

const styleToString = (style: Simplify<PropertiesHyphen>) =>
  Object.entries(style)
    .map(([key, value = ""]) => `${key}: ${value.toString()};` as const)
    .join(" ")

/**
 * Use only in development mode
 *
 * Counts how many times the component re-renders and logs the results to the console.
 */
export const useComponentUpdateLogger = (
  options: ComponentLoggerOptions = {},
) => {
  const componentName =
    new Error().stack?.split("\n")[2]?.split(" ")[5] ?? "Component"

  const finalOptions = useMemo(
    () =>
      Object.assign(options, {
        ...DEFAULT_OPTIONS,
        ...options,
        componentNameStyle: {
          ...DEFAULT_OPTIONS.componentNameStyle,
          ...options.componentNameStyle,
        },
        renderCountStyle: {
          ...DEFAULT_OPTIONS.renderCountStyle,
          ...options.renderCountStyle,
        },
      }),
    [options],
  )

  const {
    componentNameStyle = DEFAULT_OPTIONS.componentNameStyle,
    renderCountStyle = DEFAULT_OPTIONS.renderCountStyle,
  } = finalOptions

  const componentNameStyleStringified = useMemo(
    () => styleToString(componentNameStyle),
    [componentNameStyle],
  )

  const renderCountStyleStringified = useMemo(
    () => styleToString(renderCountStyle),
    [renderCountStyle],
  )

  const renderCount = useRef(0)

  useDebugValue(componentName)

  useComponentDidUpdate(() => {
    renderCount.current += 1

    console.log(
      `%c${componentName}%c Re-rendered %c${renderCount.current.toString()}%c ${
        renderCount.current === 1 ? "time" : "times"
      }`,
      componentNameStyleStringified,
      "",
      renderCountStyleStringified,
      "",
    )
  })
}
