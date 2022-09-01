import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Overlay } from "react-bootstrap";
import {
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
  FC,
  MutableRefObject,
  MouseEventHandler,
  SetStateAction,
  Dispatch,
} from "react";
import printjs from "print-js";
import { DarkMode, myContextInterface } from "../../../App";

interface Props {
  src: string;
  text: string;
  vendorName: string;
}

const PrintIconQRCodeComponent: FC<Props> = ({
  src,
  text,
  vendorName,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const target: MutableRefObject<null> = useRef<null>(null);

  const clickHandler: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
      printjs({
        printable: src,
        type: "image",
        header:
          "You can scan this image on the vendor's website to pull up all the items at once.",
        imageStyle: "width:80%;margin-bottom:20px;",
      });
    }, [src]);

  const openTooltip: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
      setShow(true);
    }, []);

  const closeTooltip: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
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

export default memo<Props>(PrintIconQRCodeComponent);
