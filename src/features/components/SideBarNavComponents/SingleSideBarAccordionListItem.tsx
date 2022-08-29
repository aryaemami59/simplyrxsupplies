import { Button, ButtonGroup } from "react-bootstrap";
import { memo, useCallback, FC, useContext } from "react";
import { shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../addedSlice";
import SideBarVendorBadges from "./SideBarVendorBadges";
import { itemInterface } from "../../../addedSlice";
import { useAppDispatch, useAppSelector } from "../../../data/store";
import { DarkMode } from "../../../App";

interface Props {
  category: string;
  itemObj: itemInterface;
}

const SingleSideBarAccordionListItem: FC<Props> = ({
  category,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors: boolean = useAppSelector(
    checkIfAddedToAllVendors(itemObj)
  );
  const vendors: string[] = useAppSelector(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );

  const clickHandler = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  const ifAddedColors = darkTheme ? "info text-white" : "dark text-white";

  const notAddedColors = darkTheme ? "outline-info" : "outline-dark";

  return (
    <>
      <Button
        size="lg"
        disabled={ifAddedToAllVendors}
        className="fw-bold"
        variant={`${
          ifAddedToAllVendors ? ifAddedColors : notAddedColors
        } custom-text-shadow-white-5`}
        onClick={clickHandler}
        key={`${itemObj.name}-${category}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      <ButtonGroup
        key={`ButtonGroup-SingleSideBarAccordionListItem-${itemObj.name}-${category}`}
        size="sm"
        vertical>
        {itemObj.vendors.map(e => (
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
