import { useEffect, useRef, useState } from "react"

/**
 * Returns the previous value of a given state or prop.
 * This hook stores the most recent render's value in a ref and returns
 * the value from the previous render.
 * On the initial render, it returns **`undefined`**.
 *
 * @param currentState - The current state or prop whose previous value should be tracked.
 * @returns The value from the previous render, or **`undefined`** on the initial render.
 *
 * @example
 * <caption>Tracking the previous state of a counter.</caption>
 *
 * ```tsx
 * import { useEffect, useState } from "react";
 * import { usePreviousState } from "../../hooks/usePreviousState.js";
 *
 * export const Counter = () => {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePreviousState(count);
 *
 *   useEffect(() => {
 *     console.log(`Count changed from ${prevCount} to ${count}`);
 *   }, [count]);
 *
 *   return (
 *     <button onClick={() => setCount(previousCount => previousCount + 1)}>
 *       Count: {count}
 *     </button>
 *   );
 * }
 * ```
 *
 * @template StateType - Type of the tracked state or value.
 */
export const usePreviousState = <StateType>(
  currentState: StateType,
): StateType | undefined => {
  const previousRef = useRef<StateType>(undefined)

  const [previous, setPrevious] = useState<StateType | undefined>(undefined)

  useEffect(() => {
    setPrevious(previousRef.current)

    previousRef.current = currentState
  }, [currentState])

  return previous
}
