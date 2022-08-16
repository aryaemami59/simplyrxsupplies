import { memo } from "react";
import { Card } from "react-bootstrap";

function SearchResultsItemNameComponent({ itemObj }) {
  return (
    <Card.Title
      className="bg-primary py-2 rounded fw-normal"
      key={`Card.Title-${itemObj.name}-SearchResultsItemNameComponent`}>
      {itemObj.name}
    </Card.Title>
  );
}

export default memo(SearchResultsItemNameComponent);
