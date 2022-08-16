import { memo } from "react";
import { Badge } from "react-bootstrap";

function SearchResultsItemNumberComponent({ itemObj }) {
  return <Badge className="fs-6 mb-2">Item Number: {itemObj.itemNumber}</Badge>;
}

export default memo(SearchResultsItemNumberComponent);
