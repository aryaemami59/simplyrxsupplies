import { Badge, Container } from "reactstrap";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import { memo } from "react";

function VendorBadges({ vendorName, itemObj, officialVendorName }) {
  const addedItems = useSelector(
    selectByVendor(vendorName),
    (prev, next) => !next.includes(itemObj) && !prev.includes(itemObj)
  );
  return (
    <Container key={`${vendorName}-${itemObj.name}-badge-container`}>
      <Badge
        className={addedItems.includes(itemObj) ? "opacity-50" : ""}
        color="primary">
        {officialVendorName}
      </Badge>
    </Container>
  );
}

export default memo(VendorBadges);
