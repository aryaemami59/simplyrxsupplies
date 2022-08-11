import QRCode from "qrcode";
import joinChars from "../../../data/joinCharacters";
import { useSelector } from "react-redux";
import { selectByVendorItemNumbers } from "../../../addedSlice";
import { memo } from "react";
import PropTypes from "prop-types";
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
    <div
      className="bg-dark bg-gradient"
      key={`${vendorName}-container-QRCodeImageComponent`}>
      <img
        src={src}
        alt={src}
        key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
      />
      <PrintIconQRCodeComponent
        vendorName={vendorName}
        src={src}
        text={"Print The QRCode"}
        key={`${vendorName}-PrintIconQRCodeComponent-QRCodeImageComponent`}
      />
    </div>
  );
}

QRCodeImageComponent.propTypes = {
  vendorName: PropTypes.string,
};

export default memo(QRCodeImageComponent);
