import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler, RefObject } from "react";
import { memo, useCallback } from "react";
import { shallowEqual } from "react-redux";

import { addItems } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  checkIfAddedToAllVendors,
  selectVendorsByItemName,
} from "../../redux/selectors";
import type { ItemName } from "../../types/api";
import { itemNames } from "../../types/api";
import SideBarVendorBadges from "./SideBarVendorBadges";

type Props = {
  itemName: ItemName;
  target: RefObject<HTMLDivElement>;
};

const SingleSideBarCategoryListItem: FC<Props> = ({ itemName, target }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );

  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(addItems(itemName));
    target.current?.focus();
  }, [dispatch, itemName, target]);

  return (
    <>
      <div>
        <Button
          size="small"
          disabled={ifAddedToAllVendors}
          className="fw-bold p-auto shadow-sm rounded-pill text-none"
          variant="contained"
          onClick={clickHandler}>
          {itemName}
        </Button>
      </div>
      <ButtonGroup
        className="text-center"
        size="small"
        orientation="vertical">
        {vendors.map(vendorName => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemName}${vendorName}`}
            itemName={itemName}
            vendorName={vendorName}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

SingleSideBarCategoryListItem.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
  target: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement).isRequired,
  }).isRequired,
};

export default memo<Props>(SingleSideBarCategoryListItem);
