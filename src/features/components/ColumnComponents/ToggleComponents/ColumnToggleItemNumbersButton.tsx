import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { ToggleItemNumber } from "../../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { RootState } from "../../../../Redux/store";

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
