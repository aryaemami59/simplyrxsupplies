import { useAppSelector } from "../redux/hooks";
import { checkIfLoading, selectErrMsg } from "../redux/selectors";

const useIsLoading = () => {
  const isLoading = useAppSelector(checkIfLoading);
  const errMsg = useAppSelector(selectErrMsg);
  return [isLoading, errMsg] as const;
};

export default useIsLoading;
