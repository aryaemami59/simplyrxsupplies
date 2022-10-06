import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import printJS from "print-js";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
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
  const [show, setShow] = useState(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    printJS({
      printable: itemObj.src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [itemObj.src, header]);

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
            icon={faPrint}
            size="1x"
            role="button"
            key={`${header}-PrintIconBarcodeComponent`}
          />
        </IconButton>
      </Tooltip>
      {/* <Overlay
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
      </Overlay> */}
    </>
  );
};

export default memo<Props>(PrintBarcodeIcon);
