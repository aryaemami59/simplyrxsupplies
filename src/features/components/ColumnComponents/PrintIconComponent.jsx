import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useEffect, useMemo } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import printjs from "print-js";

function PrintIconComponent({ src, text }) {
  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
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
      placement="right"
      delay={{ show: 100, hide: 100 }}
      overlay={renderTooltip}
      trigger={["hover", "focus"]}>
      <FontAwesomeIcon
        onClick={clickHandler}
        icon={faPrint}
        size="lg"
        inverse
        pull="right"
        className="btn"
        role="button"
      />
    </OverlayTrigger>
  );
}

export default memo(PrintIconComponent);
