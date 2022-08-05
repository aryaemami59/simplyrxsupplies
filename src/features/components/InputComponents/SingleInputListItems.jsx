import { ListGroupItem, Badge, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor, addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import jsbarcode from "jsbarcode";
import { memo } from "react";
import BarcodeImageComponent from "./BarcodeImageComponent";

function SingleInputListItems({ itemObj, vendors }) {
  const dispatch = useDispatch();

  function clickHandler() {
    dispatch(addItems({ itemObj, vendors }));
  }
  return (
    <ListGroupItem
      role="button"
      key={`$${itemObj.name}-badge`}
      onClick={clickHandler}>
      {itemObj.name}
      {vendors.map(e => (
        <Container key={`${e}-${itemObj.name}-badge-container`}>
          <VendorBadges
            key={`${e}-${itemObj.name}-badge`}
            itemObj={itemObj}
            vendorName={e}
          />
        </Container>
      ))}
      {/* <BarcodeImageComponent
        src={itemObj.src}
        itemNumber={itemObj.itemNumber}
      /> */}
    </ListGroupItem>
  );
}

export default memo(SingleInputListItems);
