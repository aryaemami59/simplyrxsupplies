import { faMaximize } from "@fortawesome/free-solid-svg-icons/faMaximize";
import { faMinimize } from "@fortawesome/free-solid-svg-icons/faMinimize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useMemo, useState } from "react";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  open: boolean;
  toggle: MouseEventHandler<HTMLButtonElement>;
};

const CollapseButton: FC<Props> = ({ open, toggle }) => {
  const [show, setShow] = useState(false);
  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={open ? faMaximize : faMinimize} />,
    [open]
  );

  const buttonText = open ? EXPAND : COLLAPSE;

  const showTooltip = useCallback(() => {
    setShow(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      onClose={hideTooltip}
      onOpen={showTooltip}
      open={show}
      title={`${buttonText} Item Info`}>
      <IconButton
        className="w-auto d-inline-block"
        onClick={toggle}
        size="medium">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

CollapseButton.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default memo<Props>(CollapseButton);
