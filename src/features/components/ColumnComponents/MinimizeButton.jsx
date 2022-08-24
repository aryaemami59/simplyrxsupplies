import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Overlay } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
const EXPAND = "Expand";
const COLLAPSE = "Collapse";
const MinimizeButton = ({ open, toggle, vendorName, itemObj, }) => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const openTooltip = useCallback(() => {
        setShow(true);
    }, []);
    const closeTooltip = useCallback(() => {
        setShow(false);
    }, []);
    return (<>
      <FontAwesomeIcon aria-label="collapse item info" ref={target} icon={open ? faMinus : faAdd} className="btn rounded-circle hover-inverse px-2 me-1" size="2x" role="button" onMouseEnter={openTooltip} onMouseLeave={closeTooltip} onClick={toggle} key={`${vendorName}-${itemObj.name}-MinimizeButton-FontAwesomeIcon`}/>
      <Overlay key={`${vendorName}-RemoveButton-Overlay`} target={target.current} show={show} placement="top">
        {(props) => (<Tooltip key={`MinimizeButton-tooltip-${vendorName}-${itemObj.name}`} id={`MinimizeButton-tooltip-${vendorName}-${itemObj.name}`} {...props}>
            Click Here to {open ? COLLAPSE : EXPAND} The Item Info
          </Tooltip>)}
      </Overlay>
    </>);
};
// MinimizeButton.propTypes = {
//   open: PropTypes.bool,
//   toggle: PropTypes.func,
//   vendorName: PropTypes.string,
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };
export default memo(MinimizeButton);
