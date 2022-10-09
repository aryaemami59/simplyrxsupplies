import { FC, memo } from "react";
import { vendorNameType } from "../../../../customTypes/types";
import { numbersOnQR, selectQRCodeContent } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";

type Props = {
  vendorName: vendorNameType;
};

const QRCodeImageContainer: FC<Props> = ({ vendorName }) => {
  // const src = useAppSelector(selectQRCodeContent(vendorName));
  // const QRCodeContent = useAppSelector(numbersOnQR(vendorName));

  return (
    <div className="mt-4 container-fluid">
      <div className="row">
        <div className="position-relative col-md-12">
          <div className="justify-content-center row">
            <PrintIconQRCode
              vendorName={vendorName}
              // text={"Print The QRCode"}
            />
            <QRCodeModal
              // src={src}
              vendorName={vendorName}
              // itemNumbers={QRCodeContent}
            />
          </div>
          <div className="justify-content-center row">
            <QRCodeImage
              // src={src}
              // title={QRCodeContent}
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
