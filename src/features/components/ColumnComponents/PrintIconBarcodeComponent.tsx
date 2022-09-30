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
  MouseEventHandler,
} from "react";
import printJS from "print-js";
import { DarkMode, myContextInterface } from "../../../App";
import { ItemObjType } from "../../../customTypes/types";

type Props = {
  text: string;
  header: string;
  itemObj: ItemObjType;
};

const PrintIconBarcodeComponent: FC<Props> = ({
  text,
  header,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const [show, setShow] = useState<boolean>(false);
  const target = useRef<null>(null);

  const clickHandler: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    printJS({
      printable: itemObj.src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [itemObj.src, header]);

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
