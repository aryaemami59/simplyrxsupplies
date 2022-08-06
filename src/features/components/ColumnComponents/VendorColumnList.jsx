import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";
import { memo, useContext, useMemo } from "react";
import { useStore } from "react-redux";

function VendorColumnList() {
  // const store = useStore();
  // console.log(store);

  return (
    <>
      {vendors.map((e, i) => (
        <VendorColumn
          officialVendorName={officialVendorNames[e]}
          key={`${officialVendorNames[e]}-VendorColumn`}
          vendorName={e}
        />
      ))}
    </>
  );
}

VendorColumnList.propTypes = {
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(VendorColumnList);
