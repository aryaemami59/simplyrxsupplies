import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import printJS from "print-js";
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
import { ItemObjType } from "../../../../customTypes/types";

type Props = {
  text: string;
  header: string;
  itemObj: ItemObjType;
};

const PrintBarcodeIcon: FC<Props> = ({
  text,
  header,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [show, setShow] = useState(false);
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

export default memo<Props>(PrintBarcodeIcon);
