import { faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  open: boolean;
  toggle: MouseEventHandler<HTMLButtonElement>;
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

const MinimizeButton: FC<Props> = ({ open, toggle, vendorName, itemObj }) => {
  const [show, setShow] = useState(false);
  const text = `Click Here to ${open ? COLLAPSE : EXPAND} The Item Info`;

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
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          onClick={toggle}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faMinimize} />}>
          Collapse
        </Button>
      </Tooltip>
    </>
  );
};

export default memo<Props>(MinimizeButton);
