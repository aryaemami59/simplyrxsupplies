import { useAppSelector } from "../Redux/hooks";
import { checkIfLoading, selectErrMsg } from "../Redux/selectors";

const useIsLoading = () => {
  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);
  return [isLoading, errMsg] as const;
};

export default useIsLoading;
