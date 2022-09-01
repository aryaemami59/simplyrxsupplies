import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Overlay } from "react-bootstrap";
import {
  memo,
  useCallback,
  useRef,
  useState,
  FC,
  MutableRefObject,
} from "react";
import { itemInterface } from "../../../addedSlice";
import { MouseEventHandler, Dispatch, SetStateAction } from "react";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

interface Props {
  open: boolean;
  toggle: MouseEventHandler<SVGSVGElement>;
  vendorName: string;
  itemObj: itemInterface;
}

const MinimizeButton: FC<Props> = ({
  open,
  toggle,
  vendorName,
  itemObj,
}): JSX.Element => {
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const target: MutableRefObject<null> = useRef<null>(null);

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
        aria-label="collapse item info"
        ref={target}
        icon={open ? faMinus : faAdd}
        className="btn rounded-circle hover-inverse px-2 me-1"
        size="2x"
        role="button"
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        onClick={toggle}
        key={`${vendorName}-${itemObj.name}-MinimizeButton-FontAwesomeIcon`}
      />
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
