import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useRef, useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import printjs from "print-js";
import PropTypes from "prop-types";
import { Overlay } from "react-bootstrap";

function PrintIconQRCodeComponent({
  src,
  text,
  vendorName,
  officialVendorName,
}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const clickHandler = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header: "QRCode",
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  const openTooltip = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon focusable
        ref={target}
        onClick={clickHandler}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        icon={faPrint}
        size="xl"
        inverse
        pull="right"
        className="btn position-absolute end-0 me-3"
        role="button"
        key={`${vendorName}-FontAwesomeIcon-PrintIconQRCodeComponent`}
      />
      <Overlay
        key={`${vendorName}-PrintIconQRCodeComponent-Overlay`}
        target={target.current}
        show={show}
        placement="bottom">
        {props => (
          <Tooltip
            key={`PrintIconQRCodeComponent-tooltip-${vendorName}-${officialVendorName}`}
            id={`PrintIconQRCodeComponent-tooltip-${vendorName}-${officialVendorName}`}
            {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

PrintIconQRCodeComponent.propTypes = {
  src: PropTypes.string,
  text: PropTypes.string,
  vendorName: PropTypes.string,
  officialVendorName: PropTypes.string,
};

export default memo(PrintIconQRCodeComponent);
