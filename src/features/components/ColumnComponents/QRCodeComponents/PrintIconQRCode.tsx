import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { Overlay, Tooltip } from "react-bootstrap";
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
  const target = useRef<null>(null);

  const clickHandler: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header:
        "You can scan this image on the vendor's website to pull up all the items at once.",
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  const openTooltip: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon
        focusable
        ref={target}
        onClick={clickHandler}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        icon={faPrint}
        size="lg"
        inverse={darkTheme ? true : false}
        className="btn w-auto"
        role="button"
        key={`${vendorName}-FontAwesomeIcon-PrintIconQRCodeComponent`}
      />
      <Overlay
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
      </Overlay>
    </>
  );
};

export default memo<Props>(PrintIconQRCode);
