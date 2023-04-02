import Link from "@mui/material/Link";
import type { FC } from "react";
import { memo } from "react";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorName from "../../hooks/useVendorName";
import { useAppSelector } from "../../redux/hooks";
import { selectVendorsLinks } from "../../redux/selectors";

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
