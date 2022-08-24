import { Card } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";
function SearchResultsItemNameComponent({ itemObj }) {
    return (<Card.Title className="bg-primary text-white p-3 m-0 rounded fw-normal shadow custom-text-shadow-white" key={`Card.Title-${itemObj.name}-SearchResultsItemNameComponent`}>
      {itemObj.name}
    </Card.Title>);
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
