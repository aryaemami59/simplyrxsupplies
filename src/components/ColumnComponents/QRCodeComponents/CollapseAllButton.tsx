import { faMaximize, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback, useMemo, useState } from "react";

const EXPAND = "Expand" as const;
const COLLAPSE = "Collapse" as const;

type Props = {
  toggleCollapse: () => void;
  allCollapsed: boolean;
};

const CollapseAllButton: FC<Props> = ({ allCollapsed, toggleCollapse }) => {
  const [open, setOpen] = useState(false);

  const startIcon = useMemo(
    () => <FontAwesomeIcon icon={allCollapsed ? faMinimize : faMaximize} />,
    [allCollapsed]
  );

  const title = allCollapsed ? COLLAPSE : EXPAND;

  const showTooltip = useCallback(() => {
    setOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Tooltip
      onOpen={showTooltip}
      onClose={hideTooltip}
      enterDelay={500}
      enterNextDelay={500}
      title={`${title} All Items`}
      open={open}>
      <IconButton
        onClick={toggleCollapse}
        size="large"
        className="d-inline-block w-auto">
        {startIcon}
      </IconButton>
    </Tooltip>
  );
};

export default memo<Props>(CollapseAllButton);
