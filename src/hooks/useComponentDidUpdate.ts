import type { DependencyList } from "react"
import { useEffect, useRef } from "react"

/**
 * Runs a callback function after the component updates,
 * **excluding** the initial mount. This hook provides the functional
 * equivalent of React's `componentDidUpdate` lifecycle method.
 * The callback executes whenever the specified dependencies change,
 * but is skipped on the first render.
 *
 * @param callback - A function to execute after updates.
 * @param deps - An array of dependencies that trigger the callback when changed.
 *
 * @example
 * <caption>Run an effect only after updates (not on mount).</caption>
 *
 * ```tsx
 * import { useComponentDidUpdate } from "../../hooks/useComponentDidUpdate.js";
 *
 * export const Example = ({ count }: { count: number }) => {
 *   useComponentDidUpdate(() => {
 *     console.log("Count changed:", count);
 *   }, [count]);
 *
 *   return <div>Count: {count}</div>;
 * };
 * ```
 */
export const useComponentDidUpdate = (
  callback: () => void,
  deps?: DependencyList,
): void => {
  const isFirstRender = useRef(true)

  const memoizedCallback = useRef(callback)

  useEffect(() => {
    memoizedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }

    memoizedCallback.current()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
