import { useSelector } from "react-redux";
import { checkIfItemAdded } from "../../../addedSlice";
import { memo, useEffect } from "react";
import { Badge } from "react-bootstrap";

function VendorBadges({ vendorName, itemObj, officialVendorName }) {
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  useEffect(() => {
    // console.log("VendorBadges mounts");
    // return () => console.log("VendorBadges unmounts");
  }, []);

  return (
    <Badge
      className={ifAdded ? "opacity-50" : ""}
      bg="primary"
      key={`${itemObj.name}-Badge-VendorBadges`}>
      {officialVendorName}
    </Badge>
  );
}

export default memo(VendorBadges);
