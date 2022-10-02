import { FC, memo, MouseEventHandler, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../../Redux/store";
import { ToggleItemNumber } from "../../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";

const ColumnToggleItemNumbersButton: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemNumberShown = useAppSelector(
    (state: RootState) => state.added.showItemNumber
  );

  const toggleItemNumber: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
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

export default memo(ColumnToggleItemNumbersButton);