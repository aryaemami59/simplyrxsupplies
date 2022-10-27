import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { addItemsByVendor } from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { checkIfItemAddedToOneVendor } from "../../../Redux/selectors";
import useItemName from "../../customHooks/useItemName";
import useVendorName from "../../customHooks/useVendorName";

const SingleOffcanvasVendorItem: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const dispatch = useAppDispatch();

  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const clickHandler: MouseEventHandler<HTMLElement> = useCallback(() => {
    ifAddedToVendor || dispatch(addItemsByVendor({ itemName, vendorName }));
  }, [ifAddedToVendor, dispatch, itemName, vendorName]);

  return (
    <div>
      <Button
        size="large"
        disabled={ifAddedToVendor}
        className="fw-bold w-100 my-1"
        variant="contained"
        onClick={clickHandler}>
        {itemName}
      </Button>
    </div>
  );
};

export default memo(SingleOffcanvasVendorItem);
