import { Button, ButtonGroup } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { shallowEqual } from "react-redux";
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

const SingleSideBarAccordionListItem: FC<Props> = ({ category, itemObj }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    ifAddedToAllVendors || dispatch(addItems({ itemObj, vendors }));
  }, [dispatch, itemObj, vendors, ifAddedToAllVendors]);

  return (
    <>
      <div>
        <Button
          size="large"
          disabled={ifAddedToAllVendors}
          className="fw-bold"
          variant="contained"
          onClick={clickHandler}>
          {itemObj.name}
        </Button>
      </div>
      <ButtonGroup
        size="small"
        orientation="vertical">
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
