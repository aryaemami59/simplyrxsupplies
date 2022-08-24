import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Overlay } from "react-bootstrap";
import { memo, useCallback, useRef, useReducer, useContext, FC } from "react";
// import PropTypes from "prop-types";
import { DarkMode } from "../../../App";
import { itemInterface } from "../../../addedSlice";
import { Placement } from "react-bootstrap/esm/types";

type actionTypes = {
  type: string;
};

const ACTIONS = {
  CLICK_ON_ICON: "clickOnIcon",
  HOVER_OVER_ICON: "hoverOverIcon",
  HOVER_LEAVE: "hoverLeave",
  AFTER_CLICK: "afterClick",
};

function reducer(state: reducerState, action: actionTypes) {
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

type reducerState = {
  copied: boolean;
  hovered: boolean;
};

const initialState: reducerState = {
  copied: false,
  hovered: false,
};

interface Props {
  content: string;
  text: string;
  placement: Placement;
  vendorName: string;
  itemObj: itemInterface;
}

const CopyIconComponent: FC<Props> = ({
  content,
  text,
  placement,
  vendorName,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
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
    setTimeout(afterClick, 200);
  }, [content, clickOnIcon, afterClick]);

  return (
    <>
      <FontAwesomeIcon
        focusable
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        icon={faCopy}
        size="lg"
        transform=""
        inverse={darkTheme ? true : false}
        pull="right"
        className="btn p-0"
        role="button"
        key={`${itemObj.name}-${content}-${vendorName}-FontAwesomeIcon-CopyIconComponent`}
      />
      <Overlay
        target={ref.current}
        show={copied}
        placement={placement}
        key={`${itemObj.name}-${vendorName}-${content}-first-overlay`}>
        {(props) => (
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
        key={`${itemObj.name}-${vendorName}-${content}-second-overlay`}>
        {(props) => (
          <Tooltip
            id="overlay-example"
            key={`${content}-${oldText}-second-tooltip`}
            {...props}>
            {oldText}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

// CopyIconComponent.propTypes = {
//   content: PropTypes.string,
//   text: PropTypes.string,
//   placement: PropTypes.string,
//   vendorName: PropTypes.string,
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };

export default memo(CopyIconComponent);
