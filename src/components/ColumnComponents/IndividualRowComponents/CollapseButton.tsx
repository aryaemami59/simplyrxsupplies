import PropTypes from "prop-types";
import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import type { FC, MouseEventHandler } from "react";
import { memo, useMemo } from "react";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  open: boolean;
  toggle: MouseEventHandler<HTMLButtonElement>;
};

const CollapseButton: FC<Props> = ({ open, toggle }) => {
  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={open ? faMinimize : faMaximize} />,
    [open]
  );

  const buttonText = open ? COLLAPSE : EXPAND;

  return (
    <Button
      className="flex-grow-1"
      onClick={toggle}
      variant="contained"
      startIcon={startIcon}>
      {buttonText}
    </Button>
  );
};

CollapseButton.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default memo<Props>(CollapseButton);
