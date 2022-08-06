import { memo } from "react";

function BarcodeImageComponent({ src, itemNumber }) {
  return <img src={src} alt={itemNumber} />;
}

export default memo(BarcodeImageComponent);
