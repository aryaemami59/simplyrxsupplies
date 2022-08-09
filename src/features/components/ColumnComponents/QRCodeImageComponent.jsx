import QRCode from "qrcode";
import joinChars from "../../../data/joinCharacters";
import { useSelector } from "react-redux";
import { selectByVendorItemNumbers } from "../../../addedSlice";
import { memo, useCallback } from "react";
import printjs from "print-js";

function QRCodeImageComponent({ vendorName }) {
  const itemNumbers = useSelector(
    selectByVendorItemNumbers(vendorName, joinChars[vendorName])
  );

  let src = "";
  QRCode.toDataURL(itemNumbers, (err, url) => {
    src = url;
  });

  const clickHandler = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header: "QRCode",
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  return <img src={src} alt={src} role="button" onClick={clickHandler} />;
}

export default memo(QRCodeImageComponent);
