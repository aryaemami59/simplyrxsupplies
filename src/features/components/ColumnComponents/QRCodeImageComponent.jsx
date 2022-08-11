import QRCode from "qrcode";
import joinChars from "../../../data/joinCharacters";
import { useSelector } from "react-redux";
import { selectByVendorItemNumbers } from "../../../addedSlice";
import { memo } from "react";
// import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import PrintIconQRCodeComponent from "./PrintIconQRCodeComponent";

function QRCodeImageComponent({ vendorName }) {
  const itemNumbers = useSelector(
    selectByVendorItemNumbers(vendorName, joinChars[vendorName])
  );

  let src = "";
  QRCode.toDataURL(itemNumbers, (err, url) => {
    src = url;
  });

  return (
    <div className="bg-dark bg-gradient">
      <img src={src} alt={src} />
      <PrintIconQRCodeComponent src={src} text={"Print The QRCode"} />
    </div>
  );
}

export default memo(QRCodeImageComponent);
