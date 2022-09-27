import { Badge } from "react-bootstrap";
import { memo } from "react";
const SearchResultsItemNumberComponent = ({ itemObj, }) => {
    return (<Badge key={`Badge-SearchResultsItemNumberComponent-${itemObj.itemNumber}`} className="fs-6 fw-normal">
      Item Number: {itemObj.itemNumber}
    </Badge>);
};
export default memo(SearchResultsItemNumberComponent);
