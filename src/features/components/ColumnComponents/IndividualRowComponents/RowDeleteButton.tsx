import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { VendorAndItemName } from "../../../../customTypes/types";
import { removeItems } from "../../../../Redux/addedSlice";
import { useAppDispatch } from "../../../../Redux/hooks";

type Props = VendorAndItemName;

const RowDeleteButton: FC<Props> = ({ vendorName, itemName }) => {
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(removeItems({ itemName, vendorName }));
  }, [dispatch, itemName, vendorName]);

  return (
    <Button
      className="flex-grow-1"
      onClick={clickHandler}
      variant="contained"
      startIcon={<DeleteIcon />}>
      Delete
    </Button>
  );
};

export default memo<Props>(RowDeleteButton);
