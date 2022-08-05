import { ListGroupItem, Badge, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor, addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import jsbarcode from "jsbarcode";
import { memo } from "react";

function SingleInputListItems({ itemObj, vendors }) {
  const dispatch = useDispatch();
  // const elem = document.createElement("img");
  // jsbarcode(elem, itemObj.itemNumber);
  // const mysrc = elem.getAttribute("src");

  // const mine = {};
  // vendors.forEach(e => {
  //   mine[e] = "";
  // });
  // console.log(mine)
  // const addedVendors = []
  // vendors.map(e => {
  //   return useSelector(selectByVendor(e));
  // });

  // const addedItems = useSelector(selectByVendor(vendorName), (prev, next) => {
  //   return prev.includes(itemObj) || !next.includes(itemObj);
  // });

  function clickHandler() {
    // !addedItems.includes(itemObj) &&
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
      <img src={itemObj.src} alt="" />
    </ListGroupItem>
  );
}

export default memo(SingleInputListItems);
