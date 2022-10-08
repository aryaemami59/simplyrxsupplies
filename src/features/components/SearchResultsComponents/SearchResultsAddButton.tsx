import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { shallowEqual } from "react-redux";
import { ItemObjType } from "../../../customTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsAddButton: FC<Props> = ({ itemObj }) => {
  const IfAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    IfAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, dispatch, itemObj, vendors]);

  return (
    <Button
      disabled={IfAddedToAllVendors}
      size="large"
      variant="contained"
      key={`Button-AddItemButtonComponent-${itemObj.id}`}
      onClick={clickHandler}
      startIcon={<AddCircleOutlineRoundedIcon />}>
      Add Item
    </Button>
  );
};

export default memo<Props>(SearchResultsAddButton);
