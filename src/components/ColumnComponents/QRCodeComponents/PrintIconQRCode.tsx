import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import printjs from "print-js";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectQRCodeContent } from "../../../Redux/selectors";

const header =
  "You can scan this image on the vendor's website to pull up all the items at once.";

const startIcon = <FontAwesomeIcon icon={faPrint} />;

const title = "Print QRCode";

const PrintIconQRCode: FC = () => {
  const [open, setOpen] = useState(false);
  const vendorName = useVendorName();
  const src = useAppSelector(selectQRCodeContent(vendorName));

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
      onOpen={showTooltip}
      onClose={hideTooltip}
      enterDelay={500}
      enterNextDelay={500}
      title={title}
      open={open}>
      <IconButton
        size="large"
        className="d-inline-block w-auto"
        onClick={clickHandler}>
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo(PrintIconQRCode);
