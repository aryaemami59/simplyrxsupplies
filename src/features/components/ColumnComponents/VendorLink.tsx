import { Link } from "@mui/material";
import { FC, memo } from "react";
import { VendorNameType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import {
  selectVendorOfficialName,
  selectVendorsLinks,
} from "../../../Redux/selectors";

type Props = {
  vendorName: VendorNameType;
};

const VendorLink: FC<Props> = ({ vendorName }) => {
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

export default memo<Props>(VendorLink);
