import type { FC } from "react";
import { useDebugValue, useEffect, useRef } from "react";
import type { AnyObject, EmptyObject } from "../custom_types/redux";

/**
 * Counts how many times the component re-renders
 * @param component The component that we are checking re-renders for
 */

const useCountRender = <P extends AnyObject = EmptyObject>(
  component: FC<P>
) => {
  const { name } = component;
  const ref = useRef(0);
  const didMount = useRef(false);

  useDebugValue([name, ref.current], e => e);

  useEffect(() => {
    didMount.current = false;
    ref.current = 0;
    return () => {
      didMount.current = false;
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      ref.current += 1;
      console.log(
        `%c${name}%c Re-rendered %c${ref.current}%c ${
          ref.current === 1 ? "time" : "times"
        }`,
        "color: violet; font-size: 15px;",
        "",
        "color: violet; font-size: 15px;",
        ""
      );
    } else didMount.current = true;
  });
};

export default useCountRender;
