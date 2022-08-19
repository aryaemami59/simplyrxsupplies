import { Card } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";

function SearchResultsItemNameComponent({ itemObj }) {
  return (
    <Card.Title
      className="bg-primary p-3  rounded fw-normal"
      key={`Card.Title-${itemObj.name}-SearchResultsItemNameComponent`}>
      {itemObj.name}
    </Card.Title>
  );
}

SearchResultsItemNameComponent.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SearchResultsItemNameComponent);
