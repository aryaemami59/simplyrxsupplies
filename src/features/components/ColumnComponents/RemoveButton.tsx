import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Overlay, Tooltip } from "react-bootstrap";
import {
  memo,
  useCallback,
  useRef,
  useState,
  FC,
  MouseEventHandler,
} from "react";
import { removeItems } from "../../../Redux/addedSlice";
import { vendorNameType, ItemObjType } from "../../../customTypes/types";
import { useAppDispatch } from "../../../Redux/hooks";

type Props = {
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

const RemoveButton: FC<Props> = ({ vendorName, itemObj }): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const target = useRef<null>(null);
  const dispatch = useAppDispatch();

  const clickHandler: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    dispatch(removeItems({ itemObj, vendorName }));
  }, [dispatch, itemObj, vendorName]);

  const openTooltip: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon
        icon={faClose}
        aria-label="remove item"
        key={`${vendorName}-${itemObj.name}-CloseButton`}
        ref={target}
        onClick={clickHandler}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        className="btn rounded-circle hover-inverse"
        size="2x"
        role="button"
      />
      <Overlay
        target={target.current}
        show={show}
        placement="top"
        key={`${vendorName}-RemoveButton-Overlay`}>
        {props => (
          <Tooltip
            key={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`}
            id={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`}
            {...props}>
            Click Here to Remove The Item
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default memo<Props>(RemoveButton);
