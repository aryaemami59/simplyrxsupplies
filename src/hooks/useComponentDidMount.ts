import { useEffect, useRef } from "react";

/**
 * Runs an effect when the component mounts.
 * @template {() => void} T T must be a function.
 * @param {T} callback Callback function that gets invoked when the component mounts.
 */
const useComponentDidMount = <T extends () => void>(callback: T) => {
  const callbackRef = useRef(callback);
  const memoizedCB = callbackRef.current;

  useEffect(memoizedCB, [memoizedCB]);
};

export default useComponentDidMount;
