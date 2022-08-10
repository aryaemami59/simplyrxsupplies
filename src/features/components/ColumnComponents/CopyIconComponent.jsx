import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useRef, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Overlay } from "react-bootstrap";

function CopyIconComponent({ content }) {
  const ref = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);

  const copyItemName = useCallback(() => {
    toggle();
    navigator.clipboard.writeText(content);
    setTimeout(toggle, 500);
  }, [content, toggle]);

  return (
    <>
      <FontAwesomeIcon
        ref={ref}
        onClick={copyItemName}
        icon={faCopy}
        size="lg"
        inverse
        pull="right"
        className="btn"
        role="button"
      />
      <Overlay target={ref.current} show={tooltipOpen} placement="top">
        {props => (
          <Tooltip id="overlay-example" {...props}>
            Copied Item Name!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default memo(CopyIconComponent);
