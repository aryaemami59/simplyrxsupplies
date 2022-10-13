import { useEffect } from "react";

const useUpdateLogger = (value: unknown) => {
  useEffect(() => {
    console.log(value, "changed");
  }, [value]);
};

export default useUpdateLogger;
