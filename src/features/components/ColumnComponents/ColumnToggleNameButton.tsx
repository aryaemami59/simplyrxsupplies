import { FC, memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { ToggleItemName } from "../../../addedSlice";
import { useAppSelector, RootState, useAppDispatch } from "../../../data/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const ColumnToggleNameButton: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemNameShown = useAppSelector(
    (state: RootState) => state.added.showItemName
  );
  const toggleItemName = useCallback(() => {
    dispatch(ToggleItemName());
  }, [dispatch]);

  return (
    <Button onClick={toggleItemName}>
      {itemNameShown ? "Hide" : "Show"} Item Name
      <FontAwesomeIcon
        size="lg"
        className="ms-3"
        icon={itemNameShown ? faToggleOn : faToggleOff}
      />
    </Button>
  );
};

export default memo(ColumnToggleNameButton);
