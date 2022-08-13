import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo } from "react";
import { checkIfItemAdded } from "../../../addedSlice";
import PropTypes from "prop-types";

function VendorBadges({ vendorName, itemObj, officialVendorName }) {
  const ifAdded = useSelector(checkIfItemAdded(vendorName, itemObj));

  return (
    <Badge
      className={ifAdded ? "opacity-50" : ""}
      bg="primary"
      key={`${itemObj.name}-Badge-VendorBadges`}>
      {officialVendorName}
    </Badge>
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
