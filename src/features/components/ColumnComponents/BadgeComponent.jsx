import { memo } from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";
import PropTypes from "prop-types";

function BadgeComponent({ vendorName, className }) {
  const addedItems = useSelector(selectByVendor(vendorName));

  return (
    <Badge
      className={className}
      key={`${vendorName}-Badge-BadgeComponent`}
      bg={addedItems.length ? "success" : "secondary"}>
      {addedItems.length}
    </Badge>
  );
}

BadgeComponent.propTypes = {
  vendorName: PropTypes.string,
  className: PropTypes.string,
};

export default memo(BadgeComponent);
