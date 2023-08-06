import Link from "@mui/material/Link";
import type { FC } from "react";
import { memo } from "react";

import useDependencyChangeLogger from "../../hooks/loggers/useDependencyChangeLogger";
import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorName from "../../hooks/useVendorName";
import { useAppSelector } from "../../redux/hooks";
import { selectVendorsLinks } from "../../redux/selectors";

const VendorLink: FC = () => {
  const vendorName = useVendorName();
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  useDependencyChangeLogger(vendorLink, "vendorLink");
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
