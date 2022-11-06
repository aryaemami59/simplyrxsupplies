import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import printjs from "print-js";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import useVendorName from "../../../hooks/useVendorName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectQRCodeContent } from "../../../Redux/selectors";

const header =
  "You can scan this image on the vendor's website to pull up all the items at once.";

const startIcon = <FontAwesomeIcon icon={faPrint} />;

const PrintIconQRCode: FC = () => {
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

  return (
    <Button
      className="w-auto"
      variant="contained"
      startIcon={startIcon}
      onClick={clickHandler}>
      Print QRCode
    </Button>
  );
};

export default memo(PrintIconQRCode);
