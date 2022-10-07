import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { ToggleItemBarcode } from "../../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { RootState } from "../../../../Redux/store";

const ColumnToggleItemBarcodesButton: FC = () => {
  const dispatch = useAppDispatch();
  const itemBarcodeShown = useAppSelector(
    (state: RootState) => state.added.showItemBarcode
  );
  const toggleItemBarcode: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      dispatch(ToggleItemBarcode());
    }, [dispatch]);

  return (
    <Button
      variant="contained"
      onClick={toggleItemBarcode}>
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
