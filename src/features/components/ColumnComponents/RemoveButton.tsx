import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Overlay, Tooltip } from "react-bootstrap";
import {
  memo,
  useCallback,
  useRef,
  useState,
  FC,
  MutableRefObject,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch } from "react-redux";
import { removeItems, itemInterface } from "../../../addedSlice";

interface Props {
  vendorName: string;
  itemObj: itemInterface;
}

const RemoveButton: FC<Props> = ({ vendorName, itemObj }): JSX.Element => {
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const target: MutableRefObject<null> = useRef<null>(null);
  const dispatch = useDispatch();

  const clickHandler: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
      dispatch(removeItems({ itemObj, vendorName }));
    }, [dispatch, itemObj, vendorName]);

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
