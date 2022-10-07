import { Link } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
// import { Alert } from "react-bootstrap";
import {
  officialVendorNameType,
  vendorNameType,
} from "../../../customTypes/types";
import { selectVendorsLinks } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import { Tooltip } from "@mui/material";

type Props = {
  officialVendorName: officialVendorNameType;
  vendorName: vendorNameType;
};

const VendorLink: FC<Props> = ({
  officialVendorName,
  vendorName,
}): JSX.Element => {
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const [open, setOpen] = useState(false);
  const title = `Click Here to Go to ${officialVendorName}'s Website`;

  const showTooltip: MouseEventHandler<HTMLAnchorElement> = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip: MouseEventHandler<HTMLAnchorElement> = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="row py-3">
      <Tooltip
        title={title}
        open={open}>
        <Link
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          href={vendorLink}>
          {officialVendorName} Website
        </Link>
      </Tooltip>
    </div>
  );
};

export default memo<Props>(VendorLink);
