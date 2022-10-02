import { Button, ButtonGroup } from "react-bootstrap";
import { memo, useCallback, FC, useContext, MouseEventHandler } from "react";
import { shallowEqual } from "react-redux";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import SideBarVendorBadges from "./SideBarVendorBadges";
import { DarkMode, myContextInterface } from "../../../App";
import { Category, ItemObjType } from "../../../customTypes/types";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  category: Category;
  itemObj: ItemObjType;
};

const SingleSideBarAccordionListItem: FC<Props> = ({
  category,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
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

export default memo<Props>(SingleSideBarAccordionListItem);
