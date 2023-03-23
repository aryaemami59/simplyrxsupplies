import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";
import { addItems } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { checkIfAddedToAllVendors } from "../../Redux/selectors";
import type { ItemName } from "../../types/api";
import { itemNames } from "../../types/api";

const startIcon = <AddIcon />;

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
      className="fw-bold w-auto p-auto shadow-sm rounded-pill text-none"
      disabled={IfAddedToAllVendors}
      color="primary"
      variant="contained"
      key={`Button-AddItemButtonComponent-${itemName}`}
      onClick={clickHandler}
      startIcon={startIcon}>
      Add
    </Button>
  );
};

SearchResultsAddButton.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsAddButton);
