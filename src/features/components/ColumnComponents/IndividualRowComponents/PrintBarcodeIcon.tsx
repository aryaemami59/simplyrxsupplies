import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import printJS from "print-js";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType } from "../../../../customTypes/types";

type Props = {
  text: string;
  header: string;
  itemObj: ItemObjType;
};

const PrintBarcodeIcon: FC<Props> = ({ text, header, itemObj }) => {
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
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faPrint} />}
          onClick={clickHandler}
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          className="w-auto">
          Print Barcode
        </Button>
      </Tooltip>
    </>
  );
};

export default memo<Props>(PrintBarcodeIcon);
