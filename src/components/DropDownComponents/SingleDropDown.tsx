import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback } from "react";

import { addItemToCarts } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkIfAddedToVendor, selectItemName } from "../../redux/selectors";

type Props = {
  itemId: number;
  vendorId: number;
};

const SingleDropDown: FC<Props> = ({ itemId, vendorId }) => {
  const dispatch = useAppDispatch();

  const itemName = useAppSelector(state => selectItemName(state, itemId));

  const ifAddedToVendor = useAppSelector(state =>
    checkIfAddedToVendor(state, vendorId, itemId)
  );

  const clickHandler = useCallback<MouseEventHandler<HTMLElement>>(() => {
    if (!ifAddedToVendor) {
      dispatch(addItemToCarts({ itemId, checkedVendorIds: [vendorId] }));
    }
  }, [ifAddedToVendor, dispatch, itemId, vendorId]);

  return (
    <MenuItem
      key={itemId}
      className="text-wrap"
      disabled={ifAddedToVendor}
      onClick={clickHandler}>
      {itemName}
    </MenuItem>
  );
};

SingleDropDown.propTypes = {
  itemId: PropTypes.number.isRequired,
  vendorId: PropTypes.number.isRequired,
};

export default memo<Props>(SingleDropDown);
