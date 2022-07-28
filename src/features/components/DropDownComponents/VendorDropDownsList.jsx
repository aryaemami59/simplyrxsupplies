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
import { myContext } from "../ContextComponents/AddedContext";
// import { AddedContext } from "../../../App";

// export const itemsContext = createContext();

function VendorDropDownsList({ items }) {
  const { itemsAdded, onAdd } = useContext(myContext);

  // const empty = useMemo(() => {
  //   return [];
  // }, []);

  useEffect(() => {
    // console.log("VendorDropDownsList");
  });
  // const [added, setAdded] = useState(() => !!itemsAdded.length);
  // console.log("VendorDropDownsList");
  // const itemsAdded = useContext(AddedContext);
  // const addedStr = itemsAdded.map(({ name }) => name).join();
  // console.log(addedStr);
  // useEffect(() => {
  //   console.log(itemsAdded);
  // }, [itemsAdded]);

  // console.log(itemsAdded);

  // const added = useMemo(
  //   e => {
  //     return itemsAdded.filter(f => f[e]);
  //   },
  //   [itemsAdded]
  // );

  // vendors.map(e => console.log(added));
  // useEffect(() => {
  //   console.log(added);
  // }, [added]);

  // console.log(added);
  return (
    <>
      {vendors.map((e, i) => (
        <VendorDropDown
          officialVendorName={officialVendorNames[0][e]}
          key={e}
          vendorName={e}
          items={items}
          onAdd={onAdd}
          // itemsAdded={
          //   itemsAdded.filter(f => f[e]).length
          //     ? itemsAdded.filter(f => f[e])
          //     : empty
          // }
          // itemsAdded={itemsAdded}
          itemsAdded={itemsAdded.filter(f => f[e])}
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
