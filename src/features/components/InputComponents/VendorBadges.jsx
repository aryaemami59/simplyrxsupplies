import { Badge } from "reactstrap";
import { useSelector } from "react-redux";
import { selectByVendor, addItems } from "../../../addedSlice";
import { memo } from "react";

function VendorBadges({ vendorName, itemObj }) {
  const addedItems = useSelector(
    selectByVendor(vendorName),
    (prev, next) => !next.includes(itemObj) && !prev.includes(itemObj)
  );
  // console.log(addedItems);
  return (
    <>
      <Badge
        className={addedItems.includes(itemObj) ? "opacity-50" : ""}
        color="primary">
        {vendorName}
      </Badge>
    </>
  );
}

export default memo(VendorBadges);
