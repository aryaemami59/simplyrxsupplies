import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Overlay, Tooltip } from "react-bootstrap";
import { memo, useCallback, useRef, useState, } from "react";
import { useDispatch } from "react-redux";
import { removeItems } from "../../../addedSlice";
const RemoveButton = ({ vendorName, itemObj }) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const dispatch = useDispatch();
    const clickHandler = useCallback(() => {
        dispatch(removeItems({ itemObj, vendorName }));
    }, [dispatch, itemObj, vendorName]);
    const openTooltip = useCallback(() => {
        setShow(true);
    }, []);
    const closeTooltip = useCallback(() => {
        setShow(false);
    }, []);
    return (<>
      <FontAwesomeIcon icon={faClose} aria-label="remove item" key={`${vendorName}-${itemObj.name}-CloseButton`} ref={target} onClick={clickHandler} onMouseEnter={openTooltip} onMouseLeave={closeTooltip} className="btn rounded-circle hover-inverse" size="2x" role="button"/>
      <Overlay target={target.current} show={show} placement="top" key={`${vendorName}-RemoveButton-Overlay`}>
        {props => (<Tooltip key={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`} id={`RemoveButton-tooltip-${vendorName}-${itemObj.name}`} {...props}>
            Click Here to Remove The Item
          </Tooltip>)}
      </Overlay>
    </>);
};
export default memo(RemoveButton);
