import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useRef, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { Overlay } from "react-bootstrap";

function CopyIconComponent({ content, text, placement }) {
  const oldText = `Click to Copy The Item ${text}`;
  const copiedText = `Copied Item ${text}!`;
  const ref = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [secondTooltipOpen, setSecondTooltipOpen] = useState(false);
  const toggle = useCallback(() => setTooltipOpen(prev => !prev), []);
  const openSecond = useCallback(() => setSecondTooltipOpen(true), []);
  const closeSecond = useCallback(() => setSecondTooltipOpen(false), []);

  const copyItemName = useCallback(() => {
    setTooltipOpen(true);
    closeSecond();
    navigator.clipboard.writeText(content);
    setTimeout(toggle, 500);
  }, [content, toggle, closeSecond]);

  return (
    <>
      <FontAwesomeIcon
        ref={ref}
        onClick={copyItemName}
        onMouseEnter={openSecond}
        onMouseLeave={closeSecond}
        icon={faCopy}
        size="lg"
        inverse
        pull="right"
        className="btn"
        role="button"
      />
      <Overlay target={ref.current} show={tooltipOpen} placement={placement}>
        {props => (
          <Tooltip id="overlay-example" {...props}>
            {copiedText}
          </Tooltip>
        )}
      </Overlay>
      <Overlay
        target={ref.current}
        show={secondTooltipOpen}
        placement={placement}>
        {props => (
          <Tooltip id="overlay-example" {...props}>
            {oldText}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default memo(CopyIconComponent);
