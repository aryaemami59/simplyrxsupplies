import { Button } from "reactstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addItems, selectByVendorsNotAdded } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import { memo } from "react";
import officialVendorNames from "../../../data/officialVendorNames.json";
import BarcodeImageComponent from "./BarcodeImageComponent";

function SingleInputListItems({ itemObj, vendors, getNewList, setListItems }) {
  const dispatch = useDispatch();
  // console.log(vendors)
  // console.log(officialVendorNames);
  // console.log(useSelector(state => state.added.items));
  // let mine;

  // const notAddedVendors = useSelector(
  //   selectByVendorsNotAdded(vendors, itemObj),
  //   (prev, next) => prev.length === next.length || next.length
  // );
  const notAddedVendors = useSelector(
    selectByVendorsNotAdded(vendors, itemObj),
    shallowEqual
  );

  function clickHandler() {
    // notAddedVendors.length &&
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
        <VendorBadges
          vendors={vendors}
          key={`${e}-${itemObj.name}-badge`}
          itemObj={itemObj}
          vendorName={e}
          officialVendorName={officialVendorNames[e]}
          // clickHandler={clickHandler}
        />
      ))}
      <BarcodeImageComponent
        itemNumber={itemObj.itemNumber}
        src={itemObj.src}
      />
    </Button>
  );
}

export default memo(SingleInputListItems);
