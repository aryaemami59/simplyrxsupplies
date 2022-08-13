import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import printjs from "print-js";
import PropTypes from "prop-types";

function PrintIconQRCodeComponent({ src, text, vendorName }) {
  const renderTooltip = props => (
    <Tooltip key={`${vendorName}-tooltip`} id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const clickHandler = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header: "QRCode",
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src]);

  return (
    <OverlayTrigger
      placement="bottom"
      key={`${vendorName}-PrintIconQRCodeComponent-OverlayTrigger`}
      delay={{ show: 100, hide: 100 }}
      overlay={renderTooltip}
      trigger={["hover", "focus"]}>
      <FontAwesomeIcon
        onClick={clickHandler}
        icon={faPrint}
        size="xl"
        inverse
        pull="right"
        className="btn position-absolute end-0"
        role="button"
        key={`${vendorName}-FontAwesomeIcon-PrintIconQRCodeComponent`}
      />
    </OverlayTrigger>
  );
}

PrintIconQRCodeComponent.propTypes = {
  src: PropTypes.string,
  text: PropTypes.string,
  vendorName: PropTypes.string,
};

export default memo(PrintIconQRCodeComponent);
