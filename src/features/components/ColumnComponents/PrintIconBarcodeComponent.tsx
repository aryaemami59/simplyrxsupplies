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
  Dispatch,
  SetStateAction,
  MouseEventHandler,
  MutableRefObject,
} from "react";
import printJS from "print-js";
import { DarkMode, myContextInterface } from "../../../App";
import { itemInterface } from "../../../addedSlice";

interface Props {
  text: string;
  header: string;
  itemObj: itemInterface;
}

const PrintIconBarcodeComponent: FC<Props> = ({
  text,
  header,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const target: MutableRefObject<null> = useRef<null>(null);

  const clickHandler: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
      printJS({
        printable: itemObj.src,
        type: "image",
        header,
        imageStyle: "width:80%;margin-bottom:20px;",
      });
    }, [itemObj.src, header]);

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
        key={`${header}-PrintIconBarcodeComponent`}
      />
      <Overlay
        key={`Overlay-PrintIconBarcodeComponent-${itemObj.name}-${header}`}
        target={target.current}
        show={show}
        placement="bottom">
        {props => (
          <Tooltip
            key={`Tooltip-PrintIconBarcodeComponent-${itemObj.name}-${header}`}
            id={`PrintIconBarcodeComponent-tooltip-${itemObj.name}-${itemObj.src}`}
            {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default memo<Props>(PrintIconBarcodeComponent);