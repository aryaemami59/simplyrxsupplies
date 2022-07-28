import { Badge } from "reactstrap";
import PropTypes from "prop-types";

function BadgeComponent({ itemsAdded }) {
  // console.log("BadgeComponent");
  return (
    <Badge
      className="position-absolute top-0 start-100 translate-middle border border-light opacity-75"
      pill
      color={itemsAdded.length ? "success" : "secondary"}>
      {itemsAdded.length}
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

export default BadgeComponent;
