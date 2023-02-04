import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";
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
      onOpen={showTooltip}
      onClose={hideTooltip}
      enterDelay={500}
      enterNextDelay={500}
      title={`${buttonText} Item Info`}
      open={show}>
      <IconButton
        size="medium"
        className="w-auto d-inline-block"
        onClick={toggle}>
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
