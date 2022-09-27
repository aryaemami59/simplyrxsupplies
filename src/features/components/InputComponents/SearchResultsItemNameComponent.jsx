import { Card } from "react-bootstrap";
import { memo } from "react";
const SearchResultsItemNameComponent = ({ itemObj, }) => {
    return (<Card.Title className="bg-primary text-white p-3 m-0 rounded fw-normal" key={`Card.Title-${itemObj.name}-SearchResultsItemNameComponent`}>
      {itemObj.name}
    </Card.Title>);
};
export default memo(SearchResultsItemNameComponent);
