import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton, Tooltip } from "@mui/material";
import printjs from "print-js";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
// import { Overlay, Tooltip } from "react-bootstrap";
import { Src, vendorNameType } from "../../../../customTypes/types";

type Props = {
  src: Src;
  text: string;
  vendorName: vendorNameType;
};

const PrintIconQRCode: FC<Props> = ({ src, text, vendorName }): JSX.Element => {
  // const { darkTheme } = useContext(DarkMode);
  const [show, setShow] = useState(false);
  // const target = useRef<SVGSVGElement & HTMLElement>(null!);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header:
        "You can scan this image on the vendor's website to pull up all the items at once.",
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  const openTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <Tooltip
        title={text}
        open={show}>
        <Button
          className="w-auto"
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faPrint} />}
          onClick={clickHandler}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}>
          Print QRCode
        </Button>
      </Tooltip>
    </>
  );
};

export default memo<Props>(PrintIconQRCode);
