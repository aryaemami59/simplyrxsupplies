import Button from "@mui/material/Button";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";

import useItemName from "../../hooks/useItemName";
import useVendorName from "../../hooks/useVendorName";
import { addItemsByVendor } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfItemAddedToOneVendor } from "../../redux/selectors";

const SingleOffcanvasVendorItem: FC = () => {
  const vendorName = useVendorName();
  const itemName = useItemName();
  const dispatch = useAppDispatch();

  const ifAddedToVendor = useAppSelector(
    checkIfItemAddedToOneVendor(vendorName, itemName)
  );

  const clickHandler: MouseEventHandler<HTMLElement> = useCallback(() => {
    if (!ifAddedToVendor) {
      dispatch(addItemsByVendor({ itemName, vendorName }));
    }
  }, [ifAddedToVendor, dispatch, itemName, vendorName]);

  return (
    <div>
      <Button
        className="fw-bold w-100 my-1 fw-bold shadow-sm rounded-pill text-none"
        disabled={ifAddedToVendor}
        onClick={clickHandler}
        size="large"
        variant="contained">
        {itemName}
      </Button>
    </div>
  );
};

export default memo(SingleOffcanvasVendorItem);
