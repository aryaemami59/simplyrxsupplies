import { Badge } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";

function SearchResultsItemNumberComponent({ itemObj }) {
  return (
    <Badge
      key={`Badge-SearchResultsItemNumberComponent-${itemObj.itemNumber}`}
      className="fs-6 mb-2 fw-normal">
      Item Number: {itemObj.itemNumber}
    </Badge>
  );
}

SearchResultsItemNumberComponent.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SearchResultsItemNumberComponent);
