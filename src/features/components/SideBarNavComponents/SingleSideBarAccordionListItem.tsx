import { Button, ButtonGroup } from "react-bootstrap";
import { memo, useCallback, FC } from "react";
import { shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import SideBarVendorBadges from "./SideBarVendorBadges";
import { itemInterface } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";

interface Props {
  category: string;
  itemObj: itemInterface;
}

const SingleSideBarAccordionListItem: FC<Props> = ({
  category,
  itemObj,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  return (
    <>
      <Button
        size="lg"
        disabled={ifAddedToAllVendors}
        className="fw-bold"
        variant={`${
          ifAddedToAllVendors ? "info text-white" : "outline-info"
        } custom-text-shadow-white-50`}
        onClick={clickHandler}
        key={`${itemObj.name}-${category}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      <ButtonGroup
        key={`ButtonGroup-SingleSideBarAccordionListItem-${itemObj.name}-${category}`}
        size="sm"
        vertical>
        {itemObj.vendors.map((e) => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemObj.name}${e}`}
            itemObj={itemObj}
            vendorName={e}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

export default memo(SingleSideBarAccordionListItem);
