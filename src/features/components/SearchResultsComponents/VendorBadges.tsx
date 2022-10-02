import { Button } from "react-bootstrap";
import { memo, FC } from "react";
import {
  checkIfAddedToOneVendor,
  selectVendorOfficialName,
} from "../../../Redux/addedSlice";
import { MouseEventHandler } from "react";
import { vendorNameType, ItemObjType } from "../../../customTypes/types";
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
}): JSX.Element => {
  const ifAdded = useAppSelector(checkIfAddedToOneVendor(itemObj, vendorName));
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <Button
      disabled={disabled}
      onClick={clickHandler}
      className="w-100 px-1 px-sm-2"
      variant={ifAdded ? "outline-info" : "info text-white"}
      key={`Button-VendorBadges-${vendorName}`}>
      {officialVendorName}
    </Button>
  );
};

export default memo<Props>(VendorBadges);