import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendors.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";
import { memo, useRef } from "react";

function VendorColumnList() {
  const nodeRef = useRef(null);
  return (
    <>
      {vendors.map((e, i) => (
        <VendorColumn
          nodeRef={nodeRef}
          // ref={nodeRef}
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
