import { memo } from "react";
import PropTypes from "prop-types";

function SearchResultsBarcodeImageComponent({ itemObj }) {
  return (
    <img
      key={`img-SearchResultsBarcodeImageComponent-${itemObj.name}`}
      src={itemObj.src}
      alt={`${itemObj.itemNumber}-${itemObj.name}`}
      className=""
    />
  );
}

SearchResultsBarcodeImageComponent.propTypes = {
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(SearchResultsBarcodeImageComponent);
