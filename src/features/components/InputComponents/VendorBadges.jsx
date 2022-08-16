import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo } from "react";
import PropTypes from "prop-types";

function VendorBadges({
  vendorName,
  itemObj,
  officialVendorName,
  clickHandler,
}) {
  const ifAdded = useSelector(
    state => !state.item[itemObj.name].includes(vendorName)
  );

  return (
    <Button
      size=""
      onClick={clickHandler}
      className="w-100"
      variant={!ifAdded ? "info text-white" : "outline-info"}
      key={`${itemObj.name}-Badge-VendorBadges-`}>
      {officialVendorName}
    </Button>
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
