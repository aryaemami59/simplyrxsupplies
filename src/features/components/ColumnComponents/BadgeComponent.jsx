import { Badge } from "reactstrap";

function BadgeComponent({ itemsAdded }) {
  return (
    <Badge
      className="position-absolute top-0 start-100 translate-middle border border-light opacity-75"
      pill
      color={itemsAdded.length ? "success" : "secondary"}>
      {itemsAdded.length}
    </Badge>
  );
}

export default BadgeComponent;
