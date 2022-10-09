import QRCode from "qrcode";
import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";
import { selectQRCodeContent } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";

type Props = {
  vendorName: vendorNameType;
};

const QRCodeImageContainer: FC<Props> = ({ vendorName }) => {
  const QRCodeContent = useAppSelector(selectQRCodeContent(vendorName));

  let src = "";
  QRCode.toDataURL(QRCodeContent, (err, url) => {
    src = url;
  });

  return (
    <div className="mt-4 container-fluid">
      <div className="row">
        <div className="position-relative col-md-12">
          <div className="justify-content-center row">
            <PrintIconQRCode
              vendorName={vendorName}
              src={src}
              text={"Print The QRCode"}
            />
            <QRCodeModal
              src={src}
              vendorName={vendorName}
              itemNumbers={QRCodeContent}
            />
          </div>
          <div className="justify-content-center row">
            <QRCodeImage
              src={src}
              title={QRCodeContent}
              vendorName={vendorName}
              className="w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(QRCodeImageContainer);
