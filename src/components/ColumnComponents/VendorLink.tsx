import Link from "@mui/material/Link";
import type { FC } from "react";
import { memo } from "react";

import useOfficialVendorName from "../../hooks/useOfficialVendorName";
import useVendorId from "../../hooks/useVendorId";
import { useAppSelector } from "../../redux/hooks";
import { selectVendorsLinks } from "../../redux/selectors";

const VendorLink: FC = () => {
  const vendorId = useVendorId();
  const vendorLink = useAppSelector(state =>
    selectVendorsLinks(state, vendorId)
  );
  const officialVendorName = useOfficialVendorName(vendorId);

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
