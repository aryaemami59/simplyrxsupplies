import PropTypes from "prop-types";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { ItemName, itemNames } from "../../custom_types/types";
import { addItems } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { checkIfAddedToAllVendors } from "../../Redux/selectors";

const startIcon = <AddCircleOutlineRoundedIcon />;

type Props = {
  itemName: ItemName;
};

const SearchResultsAddButton: FC<Props> = ({ itemName }) => {
  const dispatch = useAppDispatch();
  const IfAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(addItems(itemName));
  }, [dispatch, itemName]);

  return (
    <Button
      disabled={IfAddedToAllVendors}
      size="large"
      variant="contained"
      key={`Button-AddItemButtonComponent-${itemName}`}
      onClick={clickHandler}
      startIcon={startIcon}>
      Add Item
    </Button>
  );
};

SearchResultsAddButton.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsAddButton);
