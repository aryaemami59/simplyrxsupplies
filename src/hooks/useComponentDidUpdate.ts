import { useEffect, useRef } from "react"

/**
 * Runs an effect anytime the component re-renders.
 * @param callback - Callback function that gets invoked anytime the component updates.
 * @param deps - An optional dependency array, if provided effect will run only if the values in the list change.
 */
export const useComponentDidUpdate = <T extends () => void>(
  callback: T,
  deps?: readonly unknown[],
) => {
  const didMount = useRef(false)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    didMount.current = false
    return () => {
      didMount.current = false
    }
  }, [])

  useEffect(() => {
    if (didMount.current) {
      callbackRef.current()
    } else didMount.current = true
  }, deps)
}
