import { memo } from "react";
import PropTypes from "prop-types";

function BarcodeImageComponent({ src, itemNumber }) {
  return <img src={src} alt={itemNumber} />;
}

BarcodeImageComponent.propTypes = {
  src: PropTypes.string,
  itemNumber: PropTypes.string,
};

export default memo(BarcodeImageComponent);
