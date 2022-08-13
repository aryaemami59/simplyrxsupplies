import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback, useEffect, useMemo } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import printjs from "print-js";

function PrintIconBarcodeComponent({ src, text, header }) {
  const renderTooltip = props => (
    <Tooltip className="position-absolute" id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const clickHandler = useCallback(() => {
    printjs({
      printable: src,
      type: "image",
      header: header,
      imageStyle: "width:80%;margin-bottom:20px;",
    });
  }, [src, header]);

  return (
    <OverlayTrigger
      placement="right"
      key={`${header}-overlay-trigger-PrintIconBarcodeComponent`}
      delay={{ show: 100, hide: 100 }}
      overlay={renderTooltip}
      trigger={["hover", "focus"]}>
      <FontAwesomeIcon
        onClick={clickHandler}
        icon={faPrint}
        size="xl"
        inverse
        pull="right"
        className="btn position-absolute end-0 me-4"
        role="button"
        key={`${header}-PrintIconBarcodeComponent`}
      />
    </OverlayTrigger>
  );
}

export default memo(PrintIconBarcodeComponent);
