import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { ItemObjType, vendorNameType } from "../../../../customTypes/types";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  open: boolean;
  toggle: MouseEventHandler<SVGSVGElement>;
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
  const target = useRef<null>(null);

  const openTooltip: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <IconButton >
        <FontAwesomeIcon
          aria-label="collapse item info"
          ref={target}
          icon={open ? faMinus : faAdd}
          // className="btn rounded-circle hover-inverse px-2 me-1"
          size="1x"
          role="button"
          onMouseEnter={openTooltip}
          onMouseLeave={closeTooltip}
          onClick={toggle}
          key={`${vendorName}-${itemObj.name}-MinimizeButton-FontAwesomeIcon`}
        />
      </IconButton>
      <Overlay
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
      </Overlay>
    </>
  );
};

export default memo<Props>(MinimizeButton);
