import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../customTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemName: ItemName;
};

const SearchResultsAddButton: FC<Props> = ({ itemName }) => {
  const IfAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );
  const vendorsToAddTo = useAppSelector(
    selectVendorsToAddTo(itemName),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    IfAddedToAllVendors ||
      !vendorsToAddTo.length ||
      dispatch(addItems({ itemName, vendorsToAddTo }));
  }, [IfAddedToAllVendors, dispatch, itemName, vendorsToAddTo]);

  return (
    <Button
      disabled={IfAddedToAllVendors}
      size="large"
      variant="contained"
      key={`Button-AddItemButtonComponent-${itemName}`}
      onClick={clickHandler}
      startIcon={<AddCircleOutlineRoundedIcon />}>
      Add Item
    </Button>
  );
};

export default memo<Props>(SearchResultsAddButton);
