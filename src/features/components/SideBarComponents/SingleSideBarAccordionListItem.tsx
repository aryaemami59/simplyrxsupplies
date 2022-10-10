import { Button, ButtonGroup } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../customTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsByItemName,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import SideBarVendorBadges from "./SideBarVendorBadges";

type Props = {
  itemName: ItemName;
};

const SingleSideBarAccordionListItem: FC<Props> = ({ itemName }) => {
  const dispatch = useAppDispatch();
  const ifAddedToAllVendors = useAppSelector(
    checkIfAddedToAllVendors(itemName)
  );
  const vendorsToAddTo = useAppSelector(
    selectVendorsToAddTo(itemName),
    shallowEqual
  );

  const vendors = useAppSelector(selectVendorsByItemName(itemName));

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    ifAddedToAllVendors ||
      !vendorsToAddTo.length ||
      dispatch(addItems({ itemName, vendorsToAddTo }));
  }, [ifAddedToAllVendors, vendorsToAddTo, dispatch, itemName]);

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
        size="small"
        orientation="vertical">
        {vendors.map(vendorName => (
          <SideBarVendorBadges
            key={`SideBarVendorBadges-${itemName}${vendorName}`}
            {...{ itemName, vendorName }}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

export default memo<Props>(SingleSideBarAccordionListItem);
