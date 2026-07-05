import { useDebugValue, useEffect, useMemo } from "react"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"
import { styleToCssText } from "../../utils/styleToCssText.js"
import type { LoggerStyleOptions } from "./useComponentUpdateLogger.js"
import { DEFAULT_COMPONENT_LOGGER_OPTIONS } from "./useComponentUpdateLogger.js"

/**
 * Logs a styled message to the console when a component mounts and again
 * when it unmounts. The component name is inferred automatically via
 * {@linkcode inferComponentNameFromStack()}.
 *
 * **Note**: Use only in development mode.
 *
 * @param [options] - Optional CSS style overrides for the component name token.
 *
 * @example
 * <caption>Basic usage inside a component</caption>
 *
 * ```tsx
 * import { useComponentMountLogger } from "../../hooks/loggers/useComponentMountLogger.js";
 *
 * export const Example = () => {
 *   useComponentMountLogger();
 *   return <div>Hello</div>;
 * };
 * ```
 *
 * @example
 * <caption>Override the component name style</caption>
 *
 * ```tsx
 * import { useComponentMountLogger } from "../../hooks/loggers/useComponentMountLogger.js";
 *
 * export const Example = () => {
 *   useComponentMountLogger({
 *     componentNameStyle: { color: "coral", "font-weight": "700" },
 *   });
 *   return <div>Hello</div>;
 * };
 * ```
 */
export const useComponentMountLogger = (
  options: Pick<LoggerStyleOptions, "componentNameStyle"> = {},
): void => {
  const componentName = useMemo(() => inferComponentNameFromStack(), [])

  const { componentNameStyle } = useMemo(
    () =>
      ({
        componentNameStyle: {
          ...DEFAULT_COMPONENT_LOGGER_OPTIONS.componentNameStyle,
          ...options.componentNameStyle,
        },
      }) as const satisfies Pick<LoggerStyleOptions, "componentNameStyle">,
    [options.componentNameStyle],
  )

  useEffect(() => {
    const componentNameCss = styleToCssText(componentNameStyle)

    console.log(`%c${componentName}%c mounted`, componentNameCss, "")

    return () => {
      console.log(`%c${componentName}%c unmounted`, componentNameCss, "")
    }
  }, [componentName, componentNameStyle])

  useDebugValue({ componentName })
}
