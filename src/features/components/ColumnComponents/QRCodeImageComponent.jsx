import { useSelector } from "react-redux";
import { selectQRCodeContent } from "../../../addedSlice";
import { memo } from "react";
import QRCode from "qrcode";
import PrintIconQRCodeComponent from "./PrintIconQRCodeComponent";
import PropTypes from "prop-types";

function QRCodeImageComponent({ vendorName }) {
  const itemNumbers = useSelector(selectQRCodeContent(vendorName));

  let src = "";
  QRCode.toDataURL(itemNumbers, (err, url) => {
    src = url;
  });

  return (
    <div key={`${vendorName}-container-QRCodeImageComponent`}>
      <img
        src={src}
        className="custom-shadow my-4"
        alt={src}
        key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
        title={itemNumbers}
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
