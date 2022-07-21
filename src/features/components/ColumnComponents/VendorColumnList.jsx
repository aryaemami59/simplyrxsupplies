import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";

function VendorColumnList({ itemsAdded }) {
  return (
    <>
      {vendors.map((e, i) => (
        <VendorColumn
          officialVendorName={officialVendorNames[0][e]}
          key={`${officialVendorNames[0][e]}-VendorColumn`}
          vendorName={e}
          itemsAdded={itemsAdded.filter(f => f[e])}
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

export default VendorColumnList;
