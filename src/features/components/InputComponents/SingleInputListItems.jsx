import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addItems, selectByVendorsNotAdded } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import { memo, useCallback, useEffect } from "react";
import officialVendorNames from "../../../data/officialVendorNames.json";
import BarcodeImageComponent from "./BarcodeImageComponent";
import { removeListItems } from "../../../addedSlice";
// import { removeListItems } from "../../../inputSlice";

function SingleInputListItems({ itemObj, vendors }) {
  const dispatch = useDispatch();

  // const notAddedVendors = useSelector(
  //   selectByVendorsNotAdded(vendors, itemObj),
  //   shallowEqual
  // );

  const clickHandler = useCallback(() => {
    // notAddedVendors.length &&
    dispatch(addItems(itemObj));
    // notAddedVendors.length &&
    dispatch(removeListItems(itemObj));
  }, [dispatch, itemObj]);

  useEffect(() => {
    // console.log("dispatch changed");
  }, [dispatch]);

  useEffect(() => {
    // console.log("clickHandler changed");
  }, [clickHandler]);

  // useEffect(() => {
  //   // console.log("notAddedVendors changed");
  // }, [notAddedVendors]);

  useEffect(() => {
    // console.log(" changed")
  }, []);

  useEffect(() => {
    // console.log("SingleInputListItems Mounts");
    // return () => console.log("SingleInputListItems unMounts");
  }, []);

  return (
    <button
      key={`${itemObj.name}-badge`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100">
      Item Name: {itemObj.name}
      {vendors.map(e => (
        <VendorBadges
          vendors={vendors}
          key={`${e}-${itemObj.name}-badge`}
          itemObj={itemObj}
          vendorName={e}
          officialVendorName={officialVendorNames[e]}
        />
      ))}
      <BarcodeImageComponent
        itemNumber={itemObj.itemNumber}
        src={itemObj.src}
      />
    </button>
  );
}

export default memo(SingleInputListItems);
