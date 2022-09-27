import { memo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleItemBarcode } from "../../../addedSlice";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../../data/store";
const ColumnToggleItemBarcodeButton = () => {
    const dispatch = useAppDispatch();
    const itemBarcodeShown = useAppSelector((state) => state.added.showItemBarcode);
    const toggleItemBarcode = useCallback(() => {
        dispatch(ToggleItemBarcode());
    }, [dispatch]);
    return (<Button onClick={toggleItemBarcode}>
      {itemBarcodeShown ? "Hide" : "Show"} Item Barcode
      <FontAwesomeIcon size="lg" className="ms-3" icon={itemBarcodeShown ? faToggleOn : faToggleOff}/>
    </Button>);
};
export default memo(ColumnToggleItemBarcodeButton);
