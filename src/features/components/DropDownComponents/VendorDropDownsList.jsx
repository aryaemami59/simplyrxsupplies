import { useSelector, shallowEqual } from "react-redux";
import { memo } from "react";
import { selectVendorsArr } from "../../../addedSlice";
import VendorDropDown from "./VendorDropDown";
import PropTypes from "prop-types";

function VendorDropDownsList() {
  const vendors = useSelector(selectVendorsArr, shallowEqual);

  return (
    <>
      {vendors.map(e => (
        <VendorDropDown
          key={`${e}-VendorDropDownsList-VendorDropDown`}
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
