import { memo } from "react";
import PropTypes from "prop-types";

function SearchResultsBarcodeImageComponent({ src, itemNumber }) {
  return <img src={src} alt={itemNumber} className="mb-3" />;
}

SearchResultsBarcodeImageComponent.propTypes = {
  src: PropTypes.string,
  itemNumber: PropTypes.string,
};

export default memo(SearchResultsBarcodeImageComponent);
