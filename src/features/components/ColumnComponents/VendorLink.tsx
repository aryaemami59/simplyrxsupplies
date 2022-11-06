import { Link } from "@mui/material";
import { FC, memo } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import { selectVendorsLinks } from "../../../Redux/selectors";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorName from "../../hooks/useVendorName";

const VendorLink: FC = () => {
  const vendorName = useVendorName();
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  const officialVendorName = useOfficialVendorName(vendorName);

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
