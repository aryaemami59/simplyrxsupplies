import { useAppSelector } from "../Redux/hooks";
import { checkIfLoading, selectErrMsg } from "../Redux/selectors";

const useIsLoading = (): [boolean, string] => {
  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);
  return [isLoading, errMsg];
};

export default useIsLoading;
