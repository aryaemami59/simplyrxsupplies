import { FC, memo } from "react";
import { Alert } from "react-bootstrap";
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

const VendorLink: FC<Props> = ({
  officialVendorName,
  vendorName,
}): JSX.Element => {
  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));
  return (
    <Alert variant="info">
      <Alert.Link href={vendorLink}>{officialVendorName} Website</Alert.Link>
    </Alert>
  );
};

export default memo<Props>(VendorLink);
