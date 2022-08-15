import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo, useCallback, useState } from "react";
import { checkIfItemAdded } from "../../../addedSlice";
import PropTypes from "prop-types";
import SwitchComponent from "./SwitchComponent";
// import { Form } from "react-bootstrap";
// import { Row } from "react-bootstrap";

function VendorBadges({
  vendorName,
  itemObj,
  officialVendorName,
  clickHandler,
  checked,
}) {
  const ifAdded = useSelector(state =>
    !state.item[itemObj.name].includes(vendorName)
  );
  // const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  // const [checked, setChecked] = useState(true);

  // const clickHandler = useCallback(() => {
  //   setChecked(prev => !prev);
  // }, []);

  return (
    <>
      {/* <div className="form-check form-switch">
        <input
          onChange={clickHandler}
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={checked}
        /> */}
      {/* <label className="form-check-label" htmlFor="flexSwitchCheckChecked"> */}
      <SwitchComponent
        key={`SwitchComponent-`}
        vendorName={vendorName}
        itemObj={itemObj}
      />
      <Badge
        // className={` fs-6 ${!checked ? "opacity-50" : ""}`}
        className={` fs-6 ${ifAdded ? "opacity-50" : ""}`}
        bg="primary"
        key={`${itemObj.name}-Badge-VendorBadges`}>
        {officialVendorName}
      </Badge>
      {/* </label>
      </div> */}
    </>
  );
}

VendorBadges.propTypes = {
  vendorName: PropTypes.string,
  officialVendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(VendorBadges);
