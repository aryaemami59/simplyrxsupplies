import { Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { checkIfItemAdded } from "../../../addedSlice";
import { memo, useEffect } from "react";

function VendorBadges({ vendorName, itemObj, officialVendorName }) {
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  useEffect(() => {
    // console.log("VendorBadges mounts");
    // return () => console.log("VendorBadges unmounts");
  }, []);

  return (
    <Badge className={ifAdded ? "opacity-50" : ""} color="primary">
      {officialVendorName}
    </Badge>
  );
}

export default memo(VendorBadges);
