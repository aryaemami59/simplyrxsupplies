import { useRef } from "react"

/**
 * Accepts a state value as a parameter and returns the previous state value.
 * @param state - The state whose previous value is to be returned. Can be any non-nullish value.
 * @returns The previous state.
 */
export const usePreviousState = <StateType extends NonNullable<unknown>>(
  state: StateType,
): StateType | undefined => {
  const currentRef = useRef<StateType>(state)

  const previousRef = useRef<StateType>(undefined)

  if (currentRef.current !== state) {
    previousRef.current = currentRef.current
    currentRef.current = state
  }

  return previousRef.current
}
