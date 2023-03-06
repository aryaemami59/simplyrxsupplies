import { useEffect, useRef } from "react";

/**
 * Runs an effect anytime the component re-renders.
 * @template {() => void} T T must be a function.
 * @param {T} callback Callback function that gets invoked anytime the component updates.
 * @param {readonly unknown[]} [deps] An optional dependency array, if provided effect will run only if the values in the list change.
 */
const useComponentDidUpdate = <T extends () => void>(
  callback: T,
  deps?: readonly unknown[]
) => {
  const didMount = useRef(false);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    didMount.current = false;
    return () => {
      didMount.current = false;
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      callbackRef.current();
    } else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useComponentDidUpdate;
