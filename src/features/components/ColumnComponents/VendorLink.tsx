import { Link } from "@mui/material";
import { FC, memo } from "react";
import {
  OfficialVendorNameType,
  VendorNameType,
} from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorsLinks } from "../../../Redux/selectors";

type Props = {
  officialVendorName: OfficialVendorNameType;
  vendorName: VendorNameType;
};

const VendorLink: FC<Props> = ({ officialVendorName, vendorName }) => {
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));

  return (
    <div className="row py-3 justify-content-center">
      <Link
        className="w-auto"
        href={vendorLink}>
        {officialVendorName} Website
      </Link>
    </div>
  );
};

export default memo<Props>(VendorLink);
