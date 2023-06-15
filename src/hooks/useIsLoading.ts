import { useAppSelector } from "../redux/hooks";
import { checkIfLoading, selectErrorMessage } from "../redux/selectors";

const useIsLoading = () => {
  const isLoading = useAppSelector(checkIfLoading);
  const errorMessage = useAppSelector(selectErrorMessage);
  return [isLoading, errorMessage] as const;
};

export default useIsLoading;
