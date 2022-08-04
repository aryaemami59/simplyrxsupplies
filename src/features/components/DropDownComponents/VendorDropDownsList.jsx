import VendorDropDown from "./VendorDropDown";
import vendors from "../../../data/vendorNames.json";
import officialVendorNames from "../../../data/officialVendorNames.json";
import {
  memo,
  useEffect,
  useMemo,
  useState,
  useContext,
  createContext,
} from "react";
import PropTypes from "prop-types";
// import { myContext } from "../ContextComponents/AddedContext";

function VendorDropDownsList({ items }) {
  // const { itemsAdded, onAdd } = useContext(myContext);

  useEffect(() => {
    // console.log("VendorDropDownsList");
  });

  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[0][e]}
          key={e}
          vendorName={e}
          items={items}
          index={i}
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
    })
  ),
  onAdd: PropTypes.func,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDownsList);
