import { useMemo } from "react"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"

/**
 * Returns the name of the calling React component by parsing the current
 * {@linkcode Error} stack trace via {@linkcode inferComponentNameFromStack()}.
 * Falls back to `"Component"` when the name cannot be determined.
 *
 * @returns The inferred component name string.
 */
export const useComponentName = () => {
  // TODO: this does not work with `useDebugValue()`
  const componentName = useMemo(() => inferComponentNameFromStack(), [])
  // TODO: but this works with `useDebugValue()`
  // const componentName = useMemo(inferComponentNameFromStack, [])

  return componentName
}
