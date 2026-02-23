import { useMemo } from "react"
import { inferComponentNameFromStack } from "../../utils/inferComponentNameFromStack.js"

/**
 * @todo make sure this works with {@linkcode React.useDebugValue | useDebugValue()}.
 */
export const useComponentName = () => {
  // TODO: this does not work with `useDebugValue()`
  const componentName = useMemo(() => inferComponentNameFromStack(), [])
  // TODO: but this works with `useDebugValue()`
  // const componentName = useMemo(inferComponentNameFromStack, [])

  return componentName
}
