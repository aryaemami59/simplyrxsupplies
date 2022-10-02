import { FC, memo, MouseEventHandler, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleItemBarcode } from "../../../../Redux/addedSlice";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { RootState } from "../../../../Redux/store";

const ColumnToggleItemBarcodesButton: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const itemBarcodeShown = useAppSelector(
    (state: RootState) => state.added.showItemBarcode
  );
  const toggleItemBarcode: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
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

export default memo(ColumnToggleItemBarcodesButton);
