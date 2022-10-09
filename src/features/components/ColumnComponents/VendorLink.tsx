import { Link, Tooltip } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import {
  officialVendorNameType,
  vendorNameType,
} from "../../../customTypes/types";
import { selectVendorsLinks } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";

type Props = {
  officialVendorName: officialVendorNameType;
  vendorName: vendorNameType;
};

const VendorLink: FC<Props> = ({ officialVendorName, vendorName }) => {
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const [open, setOpen] = useState(false);
  const title = `Go to ${officialVendorName}'s Website`;

  // const showTooltip: MouseEventHandler<HTMLAnchorElement> = useCallback(() => {
  //   setOpen(true);
  // }, []);

  // const hideTooltip: MouseEventHandler<HTMLAnchorElement> = useCallback(() => {
  //   setOpen(false);
  // }, []);

  return (
    <div className="row py-3 justify-content-center">
      {/* <Tooltip
        title={title}
        open={open}> */}
      <Link
        className="w-auto"
        // onMouseEnter={showTooltip}
        // onMouseLeave={hideTooltip}
        href={vendorLink}>
        {officialVendorName} Website
      </Link>
      {/* </Tooltip> */}
    </div>
  );
};

export default memo<Props>(VendorLink);
