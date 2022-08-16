import { memo } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function SearchResultsBarcodeImageComponent({ src, itemNumber }) {
  // return <Card.Img variant="bottom" src={src} alt={itemNumber} />;
  return <img src={src} alt={itemNumber} />;
}

SearchResultsBarcodeImageComponent.propTypes = {
  src: PropTypes.string,
  itemNumber: PropTypes.string,
};

export default memo(SearchResultsBarcodeImageComponent);
