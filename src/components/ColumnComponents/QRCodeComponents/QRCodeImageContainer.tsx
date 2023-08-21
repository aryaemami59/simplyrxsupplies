import type { FC } from "react";
import { memo } from "react";

import QRCodeDataProvider from "../../../contexts/QRCodeDataProvider";
import useVendorId from "../../../hooks/useVendorId";
import CollapseAllButton from "./CollapseAllButton";
import ExpandAllButton from "./ExpandAllButton";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";
import RemoveAllButton from "./RemoveAllButton";
import ShareButton from "./ShareButton";

const QRCodeImageContainer: FC = () => {
  const vendorId = useVendorId();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="position-relative col-md-12">
          <QRCodeDataProvider vendorId={vendorId}>
            <div className="justify-content-center row">
              <PrintIconQRCode />
              <QRCodeModal />
              <RemoveAllButton />
              <CollapseAllButton />
              <ExpandAllButton />
              <ShareButton />
            </div>
            <div className="justify-content-center row">
              <QRCodeImage className="w-auto" />
            </div>
          </QRCodeDataProvider>
        </div>
      </div>
    </div>
  );
};

export default memo(QRCodeImageContainer);
