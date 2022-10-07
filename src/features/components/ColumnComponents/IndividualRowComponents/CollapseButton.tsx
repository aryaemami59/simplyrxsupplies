import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  open: boolean;
  toggle: MouseEventHandler<HTMLButtonElement>;
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

const CollapseButton: FC<Props> = ({ open, toggle, vendorName, itemObj }) => {
  const [show, setShow] = useState(false);
  const text = `${open ? COLLAPSE : EXPAND} The Item Info`;

  const openTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(false);
  }, []);

  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={open ? faMinimize : faMaximize} />,
    [open]
  );

  const buttonText = open ? COLLAPSE : EXPAND;

  return (
    <>
      <Tooltip
        title={text}
        open={show}>
        <Button
          className="flex-grow-1"
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          onClick={toggle}
          variant="contained"
          startIcon={startIcon}>
          {buttonText}
        </Button>
      </Tooltip>
    </>
  );
};

export default memo<Props>(CollapseButton);
