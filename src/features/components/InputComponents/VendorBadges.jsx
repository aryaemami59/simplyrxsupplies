import { Badge, Container } from "reactstrap";
import { useSelector, shallowEqual } from "react-redux";
import { selectByVendor, checkIfItemAdded } from "../../../addedSlice";
import { memo, useEffect } from "react";

function VendorBadges({ vendorName, itemObj, officialVendorName }) {
  // const addedItems = useSelector(
  //   selectByVendor(vendorName),
  //   (prev, next) => !next.includes(itemObj) && !prev.includes(itemObj)
  // );

  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));
  // console.log(ifAdded);
  // console.log(ifAdded, addedItems.includes(itemObj));

  // const addedItems = useSelector(selectByVendor(vendorName), shallowEqual);

  // useEffect(() => {
  //   // console.log("addedItems changed");
  // }, [addedItems]);

  useEffect(() => {
    // console.log("VendorBadges mounts");
    // return () => console.log("VendorBadges unmounts");
  }, []);

  return (
    <Container key={`${vendorName}-${itemObj.name}-badge-container`}>
      <Badge
        // className={addedItems.includes(itemObj) ? "opacity-50" : ""}
        className={ifAdded ? "opacity-50" : ""}
        color="primary">
        {officialVendorName}
      </Badge>
    </Container>
  );
}

export default memo(VendorBadges);
