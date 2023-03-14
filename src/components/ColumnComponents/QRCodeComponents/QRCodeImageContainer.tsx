import type { FC } from "react";
import { memo } from "react";
import CollapseAllButton from "./CollapseAllButton";
import ExpandAllButton from "./ExpandAllButton";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";
import RemoveAllButton from "./RemoveAllButton";
import ShareButton from "./ShareButton";

const QRCodeImageContainer: FC = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="position-relative col-md-12">
        <div className="justify-content-center row">
          <PrintIconQRCode />
          <QRCodeModal />
          <RemoveAllButton />
          <CollapseAllButton
          // vendorName={ve}
          // allCollapsed={allCollapsed}
          // toggleCollapse={toggleCollapse}
          />
          <ExpandAllButton />
          <ShareButton />
        </div>
        <div className="justify-content-center row">
          <QRCodeImage className="w-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default memo(QRCodeImageContainer);
