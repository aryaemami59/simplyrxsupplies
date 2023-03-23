import Button from "@mui/material/Button";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";
import useItemName from "../../hooks/useItemName";
import useVendorName from "../../hooks/useVendorName";
import { addItemsByVendor } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { checkIfItemAddedToOneVendor } from "../../Redux/selectors";

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
        className="fw-bold w-100 my-1 fw-bold w-auto p-auto shadow-sm rounded-pill text-none"
        variant="contained"
        onClick={clickHandler}>
        {itemName}
      </Button>
    </div>
  );
};

export default memo(SingleOffcanvasVendorItem);
