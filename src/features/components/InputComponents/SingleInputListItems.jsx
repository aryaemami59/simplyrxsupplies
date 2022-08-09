import { useDispatch } from "react-redux";
import { addItems } from "../../../addedSlice";
import VendorBadges from "./VendorBadges";
import { memo, useCallback, useEffect } from "react";
import officialVendorNames from "../../../data/officialVendorNames.json";
import BarcodeImageComponent from "./BarcodeImageComponent";

function SingleInputListItems({ itemObj, vendors }) {
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    dispatch(addItems(itemObj));
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

  useEffect(() => {
    // console.log("SingleInputListItems renders");
  });

  return (
    <button
      key={`${itemObj.name}-badge`}
      onClick={clickHandler}
      className="btn btn-success d-block w-100">
      Item Name: {itemObj.name}
      {vendors.map(e => (
        <div key={`${e}-vendorBadges-container`}>
          <VendorBadges
            vendors={vendors}
            key={`${e}-${itemObj.name}-badge`}
            itemObj={itemObj}
            vendorName={e}
            officialVendorName={officialVendorNames[e]}
          />
        </div>
      ))}
      <BarcodeImageComponent
        itemNumber={itemObj.itemNumber}
        src={itemObj.src}
      />
    </button>
  );
}

export default memo(SingleInputListItems);
