import { useRef } from "react";

/**
 * `usePreviousState` Accepts a state value as a parameter and returns the previous state value.
 * @template {NonNullable<unknown>} T T can be any non-nullish value.
 * @param {T} state The state whose previous value is to be returned.
 * @returns {T | undefined} The previous state is returned.
 */
const usePreviousState = <T extends NonNullable<unknown>>(
  state: T
): T | undefined => {
  const currentRef = useRef<T>(state);
  const previousRef = useRef<T>();

  if (currentRef.current !== state) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
};

export default usePreviousState;
