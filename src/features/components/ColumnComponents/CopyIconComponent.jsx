import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useRef, useReducer } from "react";
import { Tooltip } from "react-bootstrap";
import { Overlay } from "react-bootstrap";

const ACTIONS = {
  CLICK_ON_ICON: "clickOnIcon",
  HOVER_OVER_ICON: "hoverOverIcon",
  HOVER_LEAVE: "hoverLeave",
  AFTER_CLICK: "afterClick",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.CLICK_ON_ICON:
      return {
        copied: true,
        hovered: false,
      };
    case ACTIONS.HOVER_OVER_ICON:
      return {
        copied: state.copied,
        hovered: true,
      };
    case ACTIONS.HOVER_LEAVE:
      return {
        copied: state.copied,
        hovered: false,
      };
    case ACTIONS.AFTER_CLICK:
      return {
        copied: false,
        hovered: false,
      };
    default:
      return state;
  }
}

const initialState = {
  copied: false,
  hovered: false,
};

function CopyIconComponent({ content, text, placement }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { copied, hovered } = state;
  const oldText = `Click to Copy The Item ${text}`;
  const copiedText = `Copied Item ${text}!`;
  const ref = useRef(null);
  const clickOnIcon = useCallback(
    () => dispatch({ type: ACTIONS.CLICK_ON_ICON }),
    []
  );
  const hoverOverIcon = useCallback(
    () => dispatch({ type: ACTIONS.HOVER_OVER_ICON }),
    []
  );
  const hoverLeave = useCallback(
    () => dispatch({ type: ACTIONS.HOVER_LEAVE }),
    []
  );

  const afterClick = useCallback(() => {
    dispatch({ type: ACTIONS.AFTER_CLICK });
  }, []);

  const copyItemName = useCallback(() => {
    clickOnIcon();
    navigator.clipboard.writeText(content);
    setTimeout(afterClick, 500);
  }, [content, clickOnIcon, afterClick]);

  return (
    <>
      <FontAwesomeIcon
        ref={ref}
        onClick={copyItemName}
        onMouseEnter={hoverOverIcon}
        onMouseLeave={hoverLeave}
        icon={faCopy}
        size="lg"
        inverse
        pull="right"
        className="btn"
        role="button"
      />
      <Overlay target={ref.current} show={copied} placement={placement}>
        {props => (
          <Tooltip id="overlay-example" {...props}>
            {copiedText}
          </Tooltip>
        )}
      </Overlay>
      <Overlay target={ref.current} show={hovered} placement={placement}>
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
