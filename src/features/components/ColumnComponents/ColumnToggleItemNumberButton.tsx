import { FC, memo, MouseEventHandler, useCallback } from "react";
import { Button } from "react-bootstrap";
import { ToggleItemNumber } from "../../../addedSlice";
import { useAppDispatch, useAppSelector, RootState } from "../../../data/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const ColumnToggleItemNumberButton: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemNumberShown: boolean = useAppSelector<boolean>(
    (state: RootState): boolean => state.added.showItemNumber
  );

  const toggleItemNumber: MouseEventHandler<HTMLButtonElement> =
    useCallback((): void => {
      dispatch(ToggleItemNumber());
    }, [dispatch]);

  return (
    <Button onClick={toggleItemNumber}>
      {itemNumberShown ? "Hide" : "Show"} Item Number
      <FontAwesomeIcon
        size="lg"
        className="ms-3"
        icon={itemNumberShown ? faToggleOn : faToggleOff}
      />
    </Button>
  );
};

export default memo(ColumnToggleItemNumberButton);
