import { useEffect } from "react";
const useStatus = (component: string) => {
  useEffect(() => {
    console.log(`${component} Mounted`);
    return () => {
      console.log(`${component} Unmounted`);
    };
  });
};

export default useStatus;
