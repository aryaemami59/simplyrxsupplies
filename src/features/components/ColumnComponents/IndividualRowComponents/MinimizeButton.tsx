import {
  faAdd,
  faArrowsDownToLine,
  faMinimize,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FC, memo, MouseEventHandler, useCallback, useState } from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";
import { Button } from "@mui/material";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  open: boolean;
  toggle: MouseEventHandler<HTMLButtonElement>;
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};
const MinimizeButton: FC<Props> = ({
  open,
  toggle,
  vendorName,
  itemObj,
}): JSX.Element => {
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
        {/* <IconButton
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          onClick={toggle}>
          <FontAwesomeIcon
            aria-label="collapse item info"
            icon={open ? faMinus : faAdd}
            size="1x"
            role="button"
            key={`${vendorName}-${itemObj.name}-MinimizeButton-FontAwesomeIcon`}
          />
        </IconButton> */}
      </Tooltip>
      {/* <Overlay
        key={`${vendorName}-RemoveButton-Overlay`}
        target={target.current}
        show={show}
        placement="top">
        {props => (
          <Tooltip
            key={`MinimizeButton-tooltip-${vendorName}-${itemObj.name}`}
            id={`MinimizeButton-tooltip-${vendorName}-${itemObj.name}`}
            {...props}>
            Click Here to {open ? COLLAPSE : EXPAND} The Item Info
          </Tooltip>
        )}
      </Overlay> */}
    </>
  );
};

export default memo<Props>(MinimizeButton);
