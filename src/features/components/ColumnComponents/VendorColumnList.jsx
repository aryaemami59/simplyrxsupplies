import VendorColumn from "./VendorColumn";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import PropTypes from "prop-types";
import { memo, useContext, useMemo } from "react";
import AddedContext from "../ContextComponents/AddedContext";
import { myContext } from "../ContextComponents/AddedContext";

function VendorColumnList() {
  const { itemsAdded } = useContext(myContext);
  // const itemsAdded = useContext(AddedContext);

  const empty = useMemo(() => {
    return [];
  }, []);

  console.log("VendorColumnList");

  return (
    <>
      {vendors.map((e, i) => (
        <VendorColumn
          officialVendorName={officialVendorNames[0][e]}
          key={`${officialVendorNames[0][e]}-VendorColumn`}
          vendorName={e}
          // itemsAdded={JSON.stringify(itemsAdded.filter(f => f[e]))}
          itemsAdded={
            itemsAdded.filter(f => f[e]).length
              ? itemsAdded.filter(f => f[e])
              : empty
          }
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
