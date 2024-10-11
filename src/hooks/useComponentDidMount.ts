import { useEffect, useRef } from "react"

/**
 * Runs an effect when the component mounts.
 * @param callback - Callback function that gets invoked when the component mounts.
 */
export const useComponentDidMount = (callback: () => void) => {
  const callbackRef = useRef(callback)
  const memoizedCB = callbackRef.current

  useEffect(memoizedCB, [memoizedCB])
}
