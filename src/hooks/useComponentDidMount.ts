import { useEffect, useRef } from "react"

/**
 * Runs a callback function once after the component mounts.
 * This hook provides the functional equivalent of React's
 * `componentDidMount` lifecycle method. The provided callback
 * executes only once, immediately after the component is mounted.
 * Unlike including the callback directly in a {@linkcode useEffect}
 * dependency array, this implementation uses a ref to ensure the callback's
 * identity does not trigger re-execution if it changes across renders.
 *
 * @param callback - A function to execute once after the component mounts.
 *
 * @example
 * <caption>Log a message after mounting.</caption>
 *
 * ```tsx
 * import { useComponentDidMount } from "../../hooks/useComponentDidMount.js";
 *
 * export const Example = () => {
 *   useComponentDidMount(() => {
 *     console.log("Component has mounted!");
 *   });
 *
 *   return <div>Hello World</div>;
 * }
 * ```
 */
export const useComponentDidMount = (callback: () => void): void => {
  const memoizedCallback = useRef(callback)

  useEffect(() => {
    memoizedCallback.current()
  }, [])
}
