import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SingleDropDown from "./SingleDropDown";
import PropTypes from "prop-types";
import { memo, useEffect, useState, useMemo } from "react";

function VendorDropDown({
  officialVendorName,
  items,
  vendorName,
  onAdd,
  itemsAdded,
}) {
  // const [added, setAdded] = useState(() => []);

  // console.log("VendorDropDown");

  const addedStr = useMemo(() => {
    return itemsAdded.map(({ name }) => name).join();
  }, [itemsAdded]);

  const addedArr = useMemo(() => {
    return itemsAdded;
  }, [addedStr]);

  // useEffect(() => {
  //   console.log("VendorDropDown changed");
  // }, [addedArr]);
  return (
    <>
      <UncontrolledDropdown className="me-2">
        <DropdownToggle caret>{officialVendorName}</DropdownToggle>
        <DropdownMenu dark>
          {items
            .filter(e => e[vendorName])
            .map(e => (
              <SingleDropDown
                onAdd={onAdd}
                key={`${e.name}-${vendorName}`}
                itemObj={e}
                items={items}
                itemsAdded={addedArr}
              />
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

VendorDropDown.propTypes = {
  officialVendorName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
  onAdd: PropTypes.func,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(VendorDropDown);
