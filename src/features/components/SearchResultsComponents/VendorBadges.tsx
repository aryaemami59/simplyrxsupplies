import { Button } from "@mui/material";
import { FC, memo, MouseEventHandler } from "react";
import { ItemObjType, VendorNameType } from "../../../customTypes/types";
import { selectVendorOfficialName } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";

type Props = {
  vendorName: VendorNameType;
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
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <Button
      disabled={disabled}
      onClick={clickHandler}
      className="w-100 px-1 px-sm-2"
      variant="contained">
      {officialVendorName}
    </Button>
  );
};

export default memo<Props>(VendorBadges);
