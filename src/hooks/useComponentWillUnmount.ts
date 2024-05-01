import { useEffect, useRef } from "react"

/**
 * Runs an effect when the component unmounts.
 * @param callback - Callback function that gets invoked when the component unmounts.
 */
export const useComponentWillUnmount = <T extends () => void>(callback: T) => {
  const callbackRef = useRef(callback)
  const memoizedCB = callbackRef.current

  useEffect(() => memoizedCB, [memoizedCB])
}
