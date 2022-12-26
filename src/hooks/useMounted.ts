import type { FC } from "react";
import { useDebugValue, useEffect } from "react";
import type { AnyObject, EmptyObject } from "../types/missingTypes";

/**
 * Checks when component mounts and unmounts
 * @param component Component that we are checking mount and unmount status for
 */

const useMounted = <P extends AnyObject = EmptyObject>(component: FC<P>) => {
  const { name } = component;
  useDebugValue(name, e => e);

  useEffect(() => {
    console.log(`%c${name}%c Mounted`, "color: aqua; font-size: 15px;", "");
    return () => {
      console.log(`%c${name}%c Unmounted`, "color: aqua; font-size: 15px;", "");
    };
  }, [name]);
};

export default useMounted;
