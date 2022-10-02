import { FC, memo, MouseEventHandler, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../../../Redux/store";
import { ToggleItemName } from "../../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";

const ColumnToggleNamesButton: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemNameShown = useAppSelector(
    (state: RootState) => state.added.showItemName
  );
  const toggleItemName: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
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

export default memo<{}>(ColumnToggleNamesButton);
