import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { VendorNameType } from "../../../../customTypes/types";
import { selectVendorOfficialName } from "../../../../Redux/addedSlice";
import { useAppSelector } from "../../../../Redux/hooks";
import QRCodeDialog from "./QRCodeDialog";

const title = "Take a Closer Look at The QRCode";

type Props = {
  vendorName: VendorNameType;
};

const QRCodeModal: FC<Props> = ({ vendorName }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const showModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const hideModal = useCallback(() => {
    setShow(false);
  }, []);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        key={`QRCodeModal-${vendorName}`}
        onOpen={showTooltip}
        onClose={hideTooltip}
        enterDelay={1500}
        enterNextDelay={1500}
        title={title}
        open={open}>
        <Button
          variant="contained"
          onClick={showModal}
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlassPlus} />}
          className="w-auto">
          Magnify
        </Button>
      </Tooltip>
      <QRCodeDialog
        hideModal={hideModal}
        officialVendorName={officialVendorName}
        show={show}
        vendorName={vendorName}
      />
    </>
  );
};

export default memo<Props>(QRCodeModal);
