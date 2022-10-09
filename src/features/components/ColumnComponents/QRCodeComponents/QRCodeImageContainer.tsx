import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";

type Props = {
  vendorName: vendorNameType;
};

const QRCodeImageContainer: FC<Props> = ({ vendorName }) => (
  <div className="mt-4 container-fluid">
    <div className="row">
      <div className="position-relative col-md-12">
        <div className="justify-content-center row">
          <PrintIconQRCode vendorName={vendorName} />
          <QRCodeModal vendorName={vendorName} />
        </div>
        <div className="justify-content-center row">
          <QRCodeImage
            vendorName={vendorName}
            className="w-auto"
          />
        </div>
      </div>
    </div>
  </div>
);

export default memo<Props>(QRCodeImageContainer);
