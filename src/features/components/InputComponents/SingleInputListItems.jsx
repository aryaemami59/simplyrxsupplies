import { ListGroupItem, Badge, Container } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor, addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";

function SingleInputListItems({ itemObj, vendors }) {
  const dispatch = useDispatch();
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
    </ListGroupItem>
  );
}

export default SingleInputListItems;
