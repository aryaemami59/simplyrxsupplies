import type { PropertiesHyphen } from "csstype"
import { useDebugValue, useMemo, useRef } from "react"
import type { Simplify } from "../../types/tsHelpers.js"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"
import { styleToCssText } from "../../utils/styleToCssText.js"
import { useComponentDidUpdate } from "../useComponentDidUpdate.js"

type UseComponentUpdateLoggerOptions = {
  /**
   * CSS (hyphen-case) properties applied to the **component name**
   * segment in the console log.
   *
   * @default { color: "violet", "font-size": "15px" }
   */
  componentNameStyle?: Simplify<PropertiesHyphen>

  /**
   * CSS (hyphen-case) properties applied to the **render count**
   * segment in the console log.
   *
   * @default { color: "violet", "font-size": "15px" }
   */
  renderCountStyle?: Simplify<PropertiesHyphen>
}

const USE_COMPONENT_UPDATE_LOGGER_DEFAULT_OPTIONS = {
  componentNameStyle: {
    color: "violet",
    "font-size": "15px",
  },
  renderCountStyle: {
    color: "violet",
    "font-size": "15px",
  },
} as const satisfies UseComponentUpdateLoggerOptions

/**
 * DEV-ONLY: Logs whenever the component **re-renders**
 * (skips the initial render) and displays a styled message in the console.
 * Uses an internal counter to track updates and prints a message like:
 * `"MyComponent re-rendered 3 times"`, with customizable CSS styles for
 * the component name token and the render-count token.
 * This hook is intended for debugging unnecessary re-renders during development.
 * It performs a best-effort inference of the component name and surfaces a
 * label in React DevTools via {@linkcode useDebugValue}.
 *
 * @param useComponentUpdateLoggerOptions - Optional style overrides. Defaults to `{}`.
 *
 * @example
 * <caption>Basic usage with default styling</caption>
 *
 * ```tsx
 * import { useComponentUpdateLogger } from "../../hooks/useComponentUpdateLogger.js";
 *
 * export const Example = () => {
 *   useComponentUpdateLogger();
 *   return <div>Hello</div>;
 * }
 * ```
 *
 * @example
 * <caption>Override console styles</caption>
 *
 * ```tsx
 * import { useComponentUpdateLogger } from "../../hooks/useComponentUpdateLogger.js";
 *
 * export const Example = () => {
 *   useComponentUpdateLogger({
 *     componentNameStyle: { color: "blue", "font-weight": 700 },
 *     renderCountStyle: { color: "tomato" },
 *   });
 *   return <div>Styled logs</div>;
 * }
 * ```
 */
export const useComponentUpdateLogger = (
  useComponentUpdateLoggerOptions: UseComponentUpdateLoggerOptions = {},
): void => {
  const componentName = inferComponentNameFromStack()

  const {
    componentNameStyle = USE_COMPONENT_UPDATE_LOGGER_DEFAULT_OPTIONS.componentNameStyle,
    renderCountStyle = USE_COMPONENT_UPDATE_LOGGER_DEFAULT_OPTIONS.renderCountStyle,
  } = useMemo(
    () =>
      ({
        componentNameStyle: {
          ...USE_COMPONENT_UPDATE_LOGGER_DEFAULT_OPTIONS.componentNameStyle,
          ...useComponentUpdateLoggerOptions.componentNameStyle,
        },
        renderCountStyle: {
          ...USE_COMPONENT_UPDATE_LOGGER_DEFAULT_OPTIONS.renderCountStyle,
          ...useComponentUpdateLoggerOptions.renderCountStyle,
        },
      }) as const satisfies UseComponentUpdateLoggerOptions,
    [
      useComponentUpdateLoggerOptions.componentNameStyle,
      useComponentUpdateLoggerOptions.renderCountStyle,
    ],
  )

  const componentNameCss = useMemo(
    () => styleToCssText(componentNameStyle),
    [componentNameStyle],
  )

  const renderCountCss = useMemo(
    () => styleToCssText(renderCountStyle),
    [renderCountStyle],
  )

  const renderCount = useRef(0)

  useDebugValue(componentName)

  useComponentDidUpdate(() => {
    renderCount.current += 1

    console.log(
      `%c${componentName}%c re-rendered %c${renderCount.current.toString()}%c ${
        renderCount.current === 1 ? "time" : "times"
      }`,
      componentNameCss,
      "",
      renderCountCss,
      "",
    )
  })
}
