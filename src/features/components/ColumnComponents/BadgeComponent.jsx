import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { memo } from "react";
import { addedItemsLength } from "../../../addedSlice";
import PropTypes from "prop-types";

function BadgeComponent({ vendorName }) {
  const addedItemsLen = useSelector(addedItemsLength(vendorName));

  return (
    <Badge
      className="float-end"
      key={`${vendorName}-Badge-BadgeComponent`}
      bg={addedItemsLen ? "success" : "secondary"}>
      {addedItemsLen}
    </Badge>
  );
}

BadgeComponent.propTypes = {
  vendorName: PropTypes.string,
};

export default memo(BadgeComponent);
