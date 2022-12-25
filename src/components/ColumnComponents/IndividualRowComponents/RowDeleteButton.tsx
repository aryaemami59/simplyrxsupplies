import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";
import useItemName from "../../../hooks/useItemName";
import useVendorName from "../../../hooks/useVendorName";
import { removeItems } from "../../../Redux/addedSlice";
import { useAppDispatch } from "../../../Redux/hooks";

const startIcon = <DeleteIcon />;

const RowDeleteButton: FC = () => {
  const itemName = useItemName();
  const vendorName = useVendorName();
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(removeItems({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <Button
      className="flex-grow-1"
      onClick={clickHandler}
      variant="contained"
      startIcon={startIcon}>
      Delete
    </Button>
  );
};

export default memo(RowDeleteButton);
