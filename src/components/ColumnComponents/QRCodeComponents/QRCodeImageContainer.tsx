import type { FC } from "react";
import { memo } from "react";
import CollapseAllButton from "./CollapseAllButton";
import PrintIconQRCode from "./PrintIconQRCode";
import QRCodeImage from "./QRCodeImage";
import QRCodeModal from "./QRCodeModal";
import RemoveAllButton from "./RemoveAllButton";

type Props = {
  toggleCollapse: () => void;
  allCollapsed: boolean;
};

const QRCodeImageContainer: FC<Props> = ({ allCollapsed, toggleCollapse }) => (
  <div className="container-fluid">
    <div className="row">
      <div className="position-relative col-md-12">
        <div className="justify-content-center row">
          <PrintIconQRCode />
          <QRCodeModal />
          <RemoveAllButton />
          <CollapseAllButton
            allCollapsed={allCollapsed}
            toggleCollapse={toggleCollapse}
          />
        </div>
        <div className="justify-content-center row">
          <QRCodeImage className="w-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default memo<Props>(QRCodeImageContainer);
