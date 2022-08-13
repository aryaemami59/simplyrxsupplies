import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useRef, useReducer } from "react";
import { Tooltip } from "react-bootstrap";
import { Overlay } from "react-bootstrap";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

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

function CopyIconComponent({ content, text, placement, vendorName, itemObj }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { copied, hovered } = state;
  const oldText = `Click to Copy The Item ${text}`;
  const copiedText = `Copied Item ${text}!`;
  const ref = useRef(null);
  const clickOnIcon = useCallback(
    () => dispatch({ type: ACTIONS.CLICK_ON_ICON }),
    []
  );
  const handleMouseEnter = useCallback(
    () => dispatch({ type: ACTIONS.HOVER_OVER_ICON }),
    []
  );
  const handleMouseLeave = useCallback(
    () => dispatch({ type: ACTIONS.HOVER_LEAVE }),
    []
  );

  const afterClick = useCallback(() => {
    dispatch({ type: ACTIONS.AFTER_CLICK });
  }, []);

  const handleClick = useCallback(() => {
    clickOnIcon();
    navigator.clipboard.writeText(content);
    setTimeout(afterClick, 500);
  }, [content, clickOnIcon, afterClick]);

  return (
    <Container className="">
      <FontAwesomeIcon
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        icon={faCopy}
        size="lg"
        inverse
        pull="right"
        className="btn"
        role="button"
        key={`${itemObj.name}-${content}-${vendorName}-FontAwesomeIcon-CopyIconComponent`}
      />
      <Overlay
        target={ref.current}
        show={copied}
        placement={placement}
        key={`${itemObj.name}-${vendorName}-${content}-first-overlay`}
        className="position-absolute">
        {props => (
          <Tooltip
            key={`${content}-${copiedText}-first-tooltip`}
            id="overlay-example"
            {...props}>
            {copiedText}
          </Tooltip>
        )}
      </Overlay>
      <Overlay
        target={ref.current}
        show={hovered}
        placement={placement}
        key={`${itemObj.name}-${vendorName}-${content}-second-overlay`}
        className="position-absolute">
        {props => (
          <Tooltip
            id="overlay-example"
            key={`${content}-${oldText}-second-tooltip`}
            {...props}>
            {oldText}
          </Tooltip>
        )}
      </Overlay>
    </Container>
  );
}

CopyIconComponent.propTypes = {
  content: PropTypes.string,
  text: PropTypes.string,
  placement: PropTypes.string,
  vendorName: PropTypes.string,
  itemObj: PropTypes.shape({
    name: PropTypes.string,
    itemNumber: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    nav: PropTypes.arrayOf(PropTypes.string),
    vendors: PropTypes.arrayOf(PropTypes.string),
    src: PropTypes.string,
  }),
};

export default memo(CopyIconComponent);
