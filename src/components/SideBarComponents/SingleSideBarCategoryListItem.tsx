import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler, RefObject } from "react";
import { memo, useCallback } from "react";

import { addItemToCarts } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  checkIfAddedToAllVendors,
  selectItemName,
  selectVendorIdByItemId,
} from "../../redux/selectors";
import SideBarVendorBadges from "./SideBarVendorBadges";

type Props = {
  itemId: number;
  target: RefObject<HTMLDivElement>;
};

const SingleSideBarCategoryListItem: FC<Props> = ({ itemId, target }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(state =>
    checkIfAddedToAllVendors(state, itemId)
  );
  const itemName = useAppSelector(state => selectItemName(state, itemId));

  const vendorIds = useAppSelector(state =>
    selectVendorIdByItemId(state, itemId)
  );

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(addItemToCarts({ itemId, checkedVendorIds: vendorIds }));
    target.current?.focus();
  }, [dispatch, itemId, target, vendorIds]);

  return (
    <>
      <div>
        <Button
          className="fw-bold p-auto shadow-sm rounded-pill text-none"
          disabled={ifAddedToAllVendors}
          onClick={clickHandler}
          size="small"
          variant="contained">
          {itemName}
        </Button>
      </div>
      <ButtonGroup
        className="text-center"
        orientation="vertical"
        size="small">
        {vendorIds.map(vendorId => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemId}${vendorId}`}
            itemId={itemId}
            vendorId={vendorId}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

SingleSideBarCategoryListItem.propTypes = {
  itemId: PropTypes.number.isRequired,
  target: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement).isRequired,
  }).isRequired,
};

export default memo<Props>(SingleSideBarCategoryListItem);
