import { FC, memo, MouseEventHandler, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleItemBarcode } from "../../../addedSlice";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { RootState, useAppSelector, useAppDispatch } from "../../../data/store";

const ColumnToggleItemBarcodeButton: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemBarcodeShown: boolean = useAppSelector<boolean>(
    (state: RootState): boolean => state.added.showItemBarcode
  );
  const toggleItemBarcode: MouseEventHandler<HTMLButtonElement> =
    useCallback((): void => {
      dispatch(ToggleItemBarcode());
    }, [dispatch]);

  return (
    <Button onClick={toggleItemBarcode}>
      {itemBarcodeShown ? "Hide" : "Show"} Item Barcode
      <FontAwesomeIcon
        size="lg"
        className="ms-3"
        icon={itemBarcodeShown ? faToggleOn : faToggleOff}
      />
    </Button>
  );
};

export default memo(ColumnToggleItemBarcodeButton);