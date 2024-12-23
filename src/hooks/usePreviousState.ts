import { useRef } from "react"

/**
 * Accepts a state value as a parameter and returns the previous state value.
 * @param state - The state whose previous value is to be returned. Can be any non-nullish value.
 * @returns The previous state.
 */
export const usePreviousState = <T extends NonNullable<unknown>>(
  state: T,
): T | undefined => {
  const currentRef = useRef<T>(state)

  const previousRef = useRef<T>(undefined)

  if (currentRef.current !== state) {
    previousRef.current = currentRef.current
    currentRef.current = state
  }

  return previousRef.current
}
