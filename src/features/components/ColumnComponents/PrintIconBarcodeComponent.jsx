import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useRef, useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import printjs from "print-js";
import PropTypes from "prop-types";

function PrintIconBarcodeComponent({
  src,
  text,
  header,
  itemObj,
  officialVendorName,
}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const clickHandler = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header: header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src, header]);

  const openTooltip = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon
        ref={target}
        onClick={clickHandler}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        icon={faPrint}
        size="xl"
        inverse
        pull="right"
        className="btn position-absolute end-0"
        role="button"
        key={`${header}-PrintIconBarcodeComponent`}
      />
      <Overlay
        target={target.current}
        show={show}
        placement="bottom"
        className="position-absolute">
        {props => (
          <Tooltip
            id={`PrintIconBarcodeComponent-tooltip-${itemObj.name}-${officialVendorName}`}
            {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

PrintIconBarcodeComponent.propTypes = {
  src: PropTypes.string,
  text: PropTypes.string,
  header: PropTypes.string,
  officialVendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(PrintIconBarcodeComponent);
