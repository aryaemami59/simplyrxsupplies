import QRCode from "qrcode";
import joinChars from "../../../data/joinCharacters";
import { useSelector } from "react-redux";
import { selectByVendorItemNumbers } from "../../../addedSlice";
import { memo } from "react";
// import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import PrintIconComponent from "./PrintIconComponent";

function QRCodeImageComponent({ vendorName }) {
  const itemNumbers = useSelector(
    selectByVendorItemNumbers(vendorName, joinChars[vendorName])
  );

  let src = "";
  QRCode.toDataURL(itemNumbers, (err, url) => {
    src = url;
  });

  return (
    <div>
      <img src={src} alt={src} />
      <PrintIconComponent src={src} text={"Print The QRCode"} />
    </div>
  );
}

export default memo(QRCodeImageComponent);
