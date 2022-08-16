import { memo } from "react";
import { Card } from "react-bootstrap";

function SearchResultsItemNameComponent({ itemObj }) {
  return <Card.Title key={`ListGroup.Item-`}>{itemObj.name}</Card.Title>;
}

export default memo(SearchResultsItemNameComponent);
