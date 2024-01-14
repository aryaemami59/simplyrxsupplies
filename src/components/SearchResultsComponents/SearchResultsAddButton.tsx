import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";

import { itemAddedToCarts } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfAddedToAllVendors } from "../../redux/selectors";

const startIcon = <AddIcon />;

type Props = {
  visibleListId: number;
};

const SearchResultsAddButton: FC<Props> = ({ visibleListId }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(state =>
    checkIfAddedToAllVendors(state, visibleListId)
  );

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(itemAddedToCarts({ itemId: visibleListId }));
  }, [dispatch, visibleListId]);

  return (
    <Button
      key={`Button-AddItemButtonComponent-${visibleListId}`}
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
  visibleListId: PropTypes.number.isRequired,
};

export default memo<Props>(SearchResultsAddButton);
