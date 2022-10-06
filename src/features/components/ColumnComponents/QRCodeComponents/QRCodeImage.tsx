import QRCode from "qrcode";
import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";
import { selectQRCodeContent } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeModal from "./QRCodeModal";

type Props = {
  vendorName: vendorNameType;
};

const QRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  const itemNumbers: string = useAppSelector(selectQRCodeContent(vendorName));

  let src: string = "";
  QRCode.toDataURL(itemNumbers, (err, url) => {
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
              key={`${vendorName}-PrintIconQRCodeComponent-QRCodeImageComponent`}
            />
            <QRCodeModal
              src={src}
              vendorName={vendorName}
              itemNumbers={itemNumbers}
            />
          </div>
          <div className="justify-content-center row">
            <img
              src={src}
              className="my-4 w-auto p-0"
              alt={`${vendorName}-QRCode`}
              key={`${vendorName}-QRCode-image-QRCodeImageComponent`}
              title={itemNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo<Props>(QRCodeImage);
