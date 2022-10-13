import { useEffect } from "react";

const useUpdateLogger = (value: unknown) => {
  useEffect(() => {
    console.log(value, "Updated");
  }, [value]);
};

export default useUpdateLogger;
