import { Badge } from "reactstrap";
import PropTypes from "prop-types";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectByVendor } from "../../../addedSlice";

function BadgeComponent({ vendorName }) {
  const addedItems = useSelector(selectByVendor(vendorName));

  return (
    <Badge
      className="position-absolute top-0 start-100 translate-middle border border-light opacity-75"
      pill
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
