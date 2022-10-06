import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";
import printjs from "print-js";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
// import { Overlay, Tooltip } from "react-bootstrap";
import { DarkMode } from "../../../../App";
import { Src, vendorNameType } from "../../../../customTypes/types";

type Props = {
  src: Src;
  text: string;
  vendorName: vendorNameType;
};

const PrintIconQRCode: FC<Props> = ({ src, text, vendorName }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
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
        <IconButton
          onClick={clickHandler}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          className="d-block w-auto">
          <FontAwesomeIcon
            focusable
            // ref={target}
            icon={faPrint}
            size="1x"
            role="button"
            key={`${vendorName}-FontAwesomeIcon-PrintIconQRCodeComponent`}
          />
        </IconButton>
      </Tooltip>
      {/* <Overlay
        key={`${vendorName}-PrintIconQRCodeComponent-Overlay`}
        target={target.current}
        show={show}
        placement="bottom">
        {props => (
          <Tooltip
            key={`PrintIconQRCodeComponent-tooltip-${vendorName}`}
            id={`PrintIconQRCodeComponent-tooltip-${vendorName}`}
            {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay> */}
    </>
  );
};

export default memo<Props>(PrintIconQRCode);
