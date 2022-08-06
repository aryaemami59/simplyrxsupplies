import { Badge, Container } from "reactstrap";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import { memo, useEffect } from "react";

function VendorBadges({ vendorName, itemObj, clickHandler }) {
  const addedItems = useSelector(
    selectByVendor(vendorName),
    (prev, next) => !next.includes(itemObj) && !prev.includes(itemObj)
  );
  // console.log(addedItems);
  return (
    <Container key={`${vendorName}-${itemObj.name}-badge-container`}>
      <Badge
        className={addedItems.includes(itemObj) ? "opacity-50" : ""}
        color="primary"
        onClick={clickHandler}>
        {vendorName}
      </Badge>
    </Container>
  );
}

export default memo(VendorBadges);
