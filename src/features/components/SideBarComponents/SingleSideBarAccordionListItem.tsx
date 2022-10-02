import { FC, memo, MouseEventHandler, useCallback, useContext } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { DarkMode } from "../../../App";
import { Category, ItemObjType } from "../../../customTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import SideBarVendorBadges from "./SideBarVendorBadges";

type Props = {
  category: Category;
  itemObj: ItemObjType;
};

const SingleSideBarAccordionListItem: FC<Props> = ({
  category,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  const ifAddedColors: "info text-white" | "dark text-white" = darkTheme
    ? "info text-white"
    : "dark text-white";

  const notAddedColors: "outline-info" | "outline-dark" = darkTheme
    ? "outline-info"
    : "outline-dark";

  const buttonVariant = ifAddedToAllVendors ? ifAddedColors : notAddedColors;

  return (
    <>
      <Button
        size="lg"
        disabled={ifAddedToAllVendors}
        className="fw-bold"
        variant={`${buttonVariant} custom-text-shadow-white-5`}
        onClick={clickHandler}
        key={`${itemObj.id}-${category}-ListGroupItem-sidebar`}>
        {itemObj.name}
      </Button>
      <ButtonGroup
        key={`ButtonGroup-SingleSideBarAccordionListItem-${itemObj.id}-${category}`}
        size="sm"
        vertical>
        {itemObj.vendors.map(vendorName => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemObj.id}${vendorName}`}
            {...{ itemObj, vendorName }}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

export default memo<Props>(SingleSideBarAccordionListItem);
