import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { removeItems } from "../../../../Redux/addedSlice";
import { useAppDispatch } from "../../../../Redux/hooks";
import useItemName from "../../../customHooks/useItemName";
import useVendorName from "../../../customHooks/useVendorName";

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
