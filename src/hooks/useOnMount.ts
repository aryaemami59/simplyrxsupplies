import { useCallback, useEffect, useRef } from "react";
import type { AnyFunction } from "../types/missingTypes";
import useDependencyChangeLogger from "./useDependencyChangeLogger";

const useOnMount = <T extends AnyFunction>(callback: T) => {
  const didMount = useRef<boolean>(false);

  const memomizedCB = useCallback(() => {
    callback();
  }, [callback]);

  useDependencyChangeLogger(memomizedCB, "memomizedCB");

  useEffect(() => {
    if (didMount.current) {
      memomizedCB();
    } else didMount.current = true;
  }, [memomizedCB]);
};

export default useOnMount;
