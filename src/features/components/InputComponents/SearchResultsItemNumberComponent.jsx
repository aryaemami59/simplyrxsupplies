import { memo } from "react";
import { Badge } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";

function SearchResultsItemNumberComponent({ itemObj }) {
  return <Badge>Item Number: {itemObj.itemNumber}</Badge>;
}

export default memo(SearchResultsItemNumberComponent);
