import { Link } from "@mui/material";
import { FC, memo } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import {
  selectVendorOfficialName,
  selectVendorsLinks,
} from "../../../Redux/selectors";
import useVendorName from "../../customHooks/useVendorName";

const VendorLink: FC = () => {
  const vendorName = useVendorName();
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

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

export default memo(VendorLink);
