import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FC, memo, MouseEventHandler, useCallback, useReducer } from "react";
import {
  ItemObjType,
  VendorAndItemName,
  VendorNameType,
} from "../../../../customTypes/types";

const startIcon = <FontAwesomeIcon icon={faCopy} />;

type reducerActionType = {
  type: typeof ACTIONS[keyof typeof ACTIONS];
  payload?: string;
};

const ACTIONS = {
  CLICK_ON_ICON: "clickOnIcon",
  HOVER_OVER_ICON: "hoverOverIcon",
  HOVER_LEAVE: "hoverLeave",
  AFTER_CLICK: "afterClick",
} as const;

const reducer = (
  state: reducerState,
  action: reducerActionType
): reducerState => {
  switch (action.type) {
    case ACTIONS.CLICK_ON_ICON:
      return {
        copied: true,
        hovered: false,
        tooltipText: action.payload!,
      };
    case ACTIONS.HOVER_OVER_ICON:
      return {
        copied: state.copied,
        hovered: true,
        tooltipText: action.payload!,
      };
    case ACTIONS.HOVER_LEAVE:
      return {
        copied: state.copied,
        hovered: false,
        tooltipText: state.tooltipText,
      };
    case ACTIONS.AFTER_CLICK:
      return {
        copied: false,
        hovered: false,
        tooltipText: state.tooltipText,
      };
    default:
      return state;
  }
};

type reducerState = {
  copied: boolean;
  hovered: boolean;
  tooltipText: string;
};

type Props = {
  content: string;
  text: string;
  // vendorName: VendorNameType;
  // itemObj: ItemObjType;
};

const CopyIcon: FC<Props> = ({ content, text }) => {
  const oldText = `Copy The Item ${text}`;
  const copiedText = `Copied Item ${text}!`;
  const [state, dispatch] = useReducer(reducer, {
    copied: false,
    hovered: false,
    tooltipText: oldText,
  });
  const { copied, hovered, tooltipText } = state;
  const open = copied || hovered;

  const clickOnIcon = useCallback(
    () => dispatch({ type: ACTIONS.CLICK_ON_ICON, payload: copiedText }),
    [copiedText]
  );

  const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => dispatch({ type: ACTIONS.HOVER_OVER_ICON, payload: oldText }),
    [oldText]
  );

  const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => dispatch({ type: ACTIONS.HOVER_LEAVE }),
    []
  );

  const afterClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch({ type: ACTIONS.AFTER_CLICK });
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    // clickOnIcon();
    navigator.clipboard.writeText(content);
    // setTimeout(afterClick, 200);
  }, [content]);

  return (
    <>
      {/* <Tooltip
        title={tooltipText}
        open={open}> */}
      <Button
        className="ms-5"
        variant="contained"
        startIcon={startIcon}
        onClick={handleClick}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        Copy Item {text}
      </Button>
      {/* </Tooltip> */}
    </>
  );
};

export default memo<Props>(CopyIcon);
