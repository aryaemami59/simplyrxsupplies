import PropTypes from "prop-types";
import { Button, ButtonGroup } from "@mui/material";
import { FC, memo, MouseEventHandler, RefObject, useCallback } from "react";
import { shallowEqual } from "react-redux";
import SideBarVendorBadges from "./SideBarVendorBadges";
import { addItems } from "../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import {
  checkIfAddedToAllVendors,
  selectVendorsByItemName,
} from "../../Redux/selectors";
import { ItemName, itemNames } from "../../custom_types/api";

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
          size="large"
          disabled={ifAddedToAllVendors}
          className="fw-bold"
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
