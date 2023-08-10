import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";

import { addItems } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../redux/selectors";
import type { ItemName } from "../../types/aa";
import { itemNames } from "../../types/aa";

const startIcon = <AddIcon />;

type Props = {
  itemName: ItemName;
};

const SearchResultsAddButton: FC<Props> = ({ itemName }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(addItems(itemName));
  }, [dispatch, itemName]);

  return (
    <Button
      key={`Button-AddItemButtonComponent-${itemName}`}
      className="fw-bold w-auto p-auto shadow-sm rounded-pill text-none"
      disabled={ifAddedToAllVendors}
      onClick={clickHandler}
      startIcon={startIcon}
      variant="contained">
      Add
    </Button>
  );
};

SearchResultsAddButton.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsAddButton);
