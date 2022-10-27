import { FC, memo } from "react";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";

const QRCodeImageContainer: FC = () => (
  <div className="mt-4 container-fluid">
    <div className="row">
      <div className="position-relative col-md-12">
        <div className="justify-content-center row">
          <PrintIconQRCode />
          <QRCodeModal />
        </div>
        <div className="justify-content-center row">
          <QRCodeImage className="w-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default memo(QRCodeImageContainer);
