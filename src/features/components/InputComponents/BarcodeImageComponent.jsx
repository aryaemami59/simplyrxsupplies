// import JsBarcode from "jsbarcode";
import { memo } from "react";

function BarcodeImageComponent({ src, itemNumber }) {
  // JsBarcode(document.createElement("img"), itemNumber);

  return <img src={src} alt={itemNumber} />;
}

export default memo(BarcodeImageComponent);
