import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Overlay } from "react-bootstrap";
import { memo, useCallback, useContext, useRef, useState } from "react";
import printjs from "print-js";
import { DarkMode } from "../../../App";
const PrintIconQRCodeComponent = ({ src, text, vendorName, }) => {
    const { darkTheme } = useContext(DarkMode);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const clickHandler = useCallback(() => {
        printjs({
            printable: src,
            type: "image",
            header: "You can scan this image on the vendor's website to pull up all the items at once.",
            imageStyle: "width:80%;margin-bottom:20px;",
        });
    }, [src]);
    const openTooltip = useCallback(() => {
        setShow(true);
    }, []);
    const closeTooltip = useCallback(() => {
        setShow(false);
    }, []);
    return (<>
      <FontAwesomeIcon focusable ref={target} onClick={clickHandler} onMouseEnter={openTooltip} onMouseLeave={closeTooltip} icon={faPrint} size="lg" inverse={darkTheme ? true : false} pull="right" className="btn position-absolute end-0 me-3" role="button" key={`${vendorName}-FontAwesomeIcon-PrintIconQRCodeComponent`}/>
      <Overlay key={`${vendorName}-PrintIconQRCodeComponent-Overlay`} target={target.current} show={show} placement="bottom">
        {(props) => (<Tooltip key={`PrintIconQRCodeComponent-tooltip-${vendorName}`} id={`PrintIconQRCodeComponent-tooltip-${vendorName}`} {...props}>
            {text}
          </Tooltip>)}
      </Overlay>
    </>);
};
export default memo(PrintIconQRCodeComponent);
