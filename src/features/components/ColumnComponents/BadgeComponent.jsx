import { Badge } from "reactstrap";
import PropTypes from "prop-types";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectByVendor } from "../../../addedSlice";

function BadgeComponent({ vendorName, className }) {
  const addedItems = useSelector(selectByVendor(vendorName));

  return (
    <Badge
      className={className}
      // className="float-end"
      // pill
      color={addedItems.length ? "success" : "secondary"}>
      {addedItems.length}
    </Badge>
  );
}

BadgeComponent.propTypes = {
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
};

export default memo(BadgeComponent);
