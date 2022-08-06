import { Container, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItems, selectByVendorsNotAdded } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import { memo } from "react";

function SingleInputListItems({ itemObj, vendors, getNewList, setListItems }) {
  const dispatch = useDispatch();

  const notAddedVendors = useSelector(
    selectByVendorsNotAdded(vendors, itemObj),
    (prev, next) => prev.length === next.length || next.length
  );

  function clickHandler() {
    dispatch(addItems({ itemObj, notAddedVendors }));
    notAddedVendors.length && setListItems(getNewList(itemObj));
  }
  return (
    <Button
      role="button"
      key={`$${itemObj.name}-badge`}
      onClick={clickHandler}
      color="success"
      block
      // disabled={notAddedVendors.length ? false : true}
    >
      Item Name: {itemObj.name}
      {vendors.map(e => (
        <Container key={`${e}-${itemObj.name}-badge-container`}>
          <VendorBadges
            key={`${e}-${itemObj.name}-badge`}
            itemObj={itemObj}
            vendorName={e}
          />
        </Container>
      ))}
    </Button>
  );
}

export default memo(SingleInputListItems);
