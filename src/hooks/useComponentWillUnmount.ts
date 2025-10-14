import { useEffect, useRef } from "react"

/**
 * Runs a callback function once right before the component unmounts.
 * This hook provides the functional equivalent of React's
 * `componentWillUnmount` lifecycle method. The provided callback
 * executes exactly once—when the component is about to be removed
 * from the React tree.
 *
 * @param callback - A function to execute just before the component unmounts.
 *
 * @example
 * <caption>Clean up an event listener on unmount.</caption>
 *
 * ```tsx
 * import { useComponentWillUnmount } from "../../hooks/useComponentWillUnmount.js";
 *
 * export const Example = () => {
 *   useEffect(() => {
 *     window.addEventListener("resize", handleResize);
 *     return () => window.removeEventListener("resize", handleResize);
 *   }, []);
 *
 *   useComponentWillUnmount(() => {
 *     console.log("Component will unmount");
 *   });
 *
 *   return <div>Resize the window!</div>;
 * };
 * ```
 */
export const useComponentWillUnmount = (callback: () => void): void => {
  const memoizedCallback = useRef(callback)

  useEffect(() => {
    memoizedCallback.current = callback
  }, [callback])

  useEffect(() => memoizedCallback.current, [])
}
