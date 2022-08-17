import { memo } from "react";
import VendorDropDown from "./VendorDropDown";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectVendorsArr, selectVendorsObj } from "../../../addedSlice";
import { shallowEqual } from "react-redux";

function VendorDropDownsList() {
  const vendors = useSelector(selectVendorsArr, shallowEqual);
  console.log(vendors);
  const vendorsObj = useSelector(selectVendorsObj, shallowEqual);

  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={vendorsObj[e].officialName}
          key={e}
          vendorName={e}
        />
      ))}
    </>
  );
}

VendorDropDownsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDownsList);
