import { useDebugValue, useEffect, useMemo } from "react"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"
import { styleToCssText } from "../../utils/styleToCssText.js"
import type { LoggerStyleOptions } from "./useComponentUpdateLogger.js"
import { DEFAULT_COMPONENT_LOGGER_OPTIONS } from "./useComponentUpdateLogger.js"

/**
 * Use only in development mode
 *
 * Checks when component mounts and unmounts and logs the results to the console.
 */
export const useComponentMountLogger = (
  options: Pick<LoggerStyleOptions, "componentNameStyle"> = {},
): void => {
  const componentName = useMemo(() => inferComponentNameFromStack(), [])

  const {
    componentNameStyle = DEFAULT_COMPONENT_LOGGER_OPTIONS.componentNameStyle,
  } = useMemo(
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
