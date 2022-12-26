import { useDebugValue, useEffect, useRef } from "react";
import type { Composite } from "../types/missingTypes";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

/**
 * Logs dependency changes
 * Use only in development mode
 * @param dependency The dependency that we are checking for
 * @param depName Name of the dependency that we are checking for
 */

const useDependencyChangeLogger = <T extends Composite>(
  dependency: T,
  depName = ""
) => {
  const didMount = useRef(false);
  const depType = Array.isArray(dependency)
    ? "Array"
    : capitalizeFirstLetter(typeof dependency);

  useDebugValue([depName, dependency], e => e);

  useEffect(() => {
    didMount.current = false;
    return () => {
      didMount.current = false;
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      console.log(
        `%c${depName || "Unknown Dependency"}%c ${depType} Changed:\n%O`,
        "color:palegreen; font-size: 15px;",
        "",
        dependency
      );
    } else didMount.current = true;
  }, [dependency, depName, depType]);
};

export default useDependencyChangeLogger;
