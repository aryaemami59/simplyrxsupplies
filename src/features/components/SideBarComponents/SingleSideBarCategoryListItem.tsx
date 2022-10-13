import { Button, ButtonGroup } from "@mui/material";
import { FC, memo, MouseEventHandler, RefObject, useCallback } from "react";
import { ItemName } from "../../../customTypes/types";
import { addItems } from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  checkIfAddedToAllVendors,
  selectVendorsByItemName,
} from "../../../Redux/selectors";
import SideBarVendorBadges from "./SideBarVendorBadges";
import useUpdateLogger from "../../customHooks/useUpdateLogger";
import useStatus from "../../customHooks/useStatus";
import { shallowEqual } from "react-redux";

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

  // useUpdateLogger(vendors);
  // useStatus("SingleSideBarCategoryListItem");

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(addItems({ itemName }));
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
            {...{ itemName, vendorName }}
          />
        ))}
      </ButtonGroup>
    </>
  );
};

export default memo<Props>(SingleSideBarCategoryListItem);
