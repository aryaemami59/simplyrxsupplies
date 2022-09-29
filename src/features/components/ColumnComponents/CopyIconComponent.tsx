import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Overlay } from "react-bootstrap";
import {
  memo,
  useCallback,
  useRef,
  useReducer,
  useContext,
  FC,
  MouseEventHandler,
  MutableRefObject,
  Dispatch,
} from "react";
import { DarkMode } from "../../../App";
import { Placement } from "react-bootstrap/esm/types";
import { ItemObjType, vendorNameType } from "../../../customTypes/types";

type actionType = {
  type: typeof ACTIONS[keyof typeof ACTIONS];
};

const ACTIONS = {
  CLICK_ON_ICON: "clickOnIcon",
  HOVER_OVER_ICON: "hoverOverIcon",
  HOVER_LEAVE: "hoverLeave",
  AFTER_CLICK: "afterClick",
} as const;

const reducer = (state: reducerState, action: actionType): reducerState => {
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
};

type reducerState = typeof initialState;

const initialState = {
  copied: false,
  hovered: false,
};

type Props = {
  content: string;
  text: string;
  placement: Placement;
  vendorName: vendorNameType;
  itemObj: ItemObjType;
};

const CopyIconComponent: FC<Props> = ({
  content,
  text,
  placement,
  vendorName,
  itemObj,
}): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const [state, dispatch]: [reducerState, Dispatch<actionType>] = useReducer(
    reducer,
    initialState
  );
  const { copied, hovered } = state;
  const oldText: string = `Click to Copy The Item ${text}`;
  const copiedText: string = `Copied Item ${text}!`;
  const ref: MutableRefObject<null> = useRef(null);

  const clickOnIcon = useCallback(
    (): void => dispatch({ type: ACTIONS.CLICK_ON_ICON }),
    []
  );

  const handleMouseEnter: MouseEventHandler<SVGSVGElement> = useCallback(
    (): void => dispatch({ type: ACTIONS.HOVER_OVER_ICON }),
    []
  );

  const handleMouseLeave: MouseEventHandler<SVGSVGElement> = useCallback(
    (): void => dispatch({ type: ACTIONS.HOVER_LEAVE }),
    []
  );

  const afterClick: MouseEventHandler<SVGSVGElement> = useCallback((): void => {
    dispatch({ type: ACTIONS.AFTER_CLICK });
  }, []);

  const handleClick: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
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
        key={`${itemObj.name}-${vendorName}-${content}-second-overlay`}>
        {props => (
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

export default memo(CopyIconComponent);
