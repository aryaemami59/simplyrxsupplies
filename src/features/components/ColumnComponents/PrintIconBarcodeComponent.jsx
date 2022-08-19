import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Overlay } from "react-bootstrap";
import { memo, useCallback, useRef, useState } from "react";
import printjs from "print-js";
import PropTypes from "prop-types";

function PrintIconBarcodeComponent({ text, header, itemObj }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const clickHandler = useCallback(() => {
    printjs({
      printable: itemObj.src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [itemObj.src, header]);

  const openTooltip = useCallback(() => {
    setShow(true);
  }, []);

  const closeTooltip = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <FontAwesomeIcon
        focusable
        ref={target}
        onClick={clickHandler}
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        icon={faPrint}
        size="xl"
        inverse
        pull="right"
        className="btn position-absolute end-0 me-4"
        role="button"
        key={`${header}-PrintIconBarcodeComponent`}
      />
      <Overlay
        key={`Overlay-PrintIconBarcodeComponent-${itemObj.name}-${header}`}
        target={target.current}
        show={show}
        placement="bottom"
        className="position-absolute">
        {props => (
          <Tooltip
            key={`Tooltip-PrintIconBarcodeComponent-${itemObj.name}-${header}`}
            id={`PrintIconBarcodeComponent-tooltip-${itemObj.name}-${itemObj.src}`}
            {...props}>
            {text}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

PrintIconBarcodeComponent.propTypes = {
  text: PropTypes.string,
  header: PropTypes.string,
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
