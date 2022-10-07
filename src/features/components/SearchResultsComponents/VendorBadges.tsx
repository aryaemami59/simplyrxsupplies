import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler } from "react";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";
import {
  checkIfAddedToOneVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";

type Props = {
  vendorName: vendorNameType;
  itemObj: ItemObjType;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

const VendorBadges: FC<Props> = ({
  vendorName,
  itemObj,
  clickHandler,
  disabled,
}) => {
  const ifAdded = useAppSelector(checkIfAddedToOneVendor(itemObj, vendorName));
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const buttonVariant = ifAdded ? "outline-info" : "info text-white";

  return (
    <Button
      disabled={disabled}
      onClick={clickHandler}
      className="w-100 px-1 px-sm-2"
      variant="contained"
      // variant={buttonVariant}
      key={`Button-VendorBadges-${vendorName}`}>
      {officialVendorName}
    </Button>
  );
};

export default memo<Props>(VendorBadges);
