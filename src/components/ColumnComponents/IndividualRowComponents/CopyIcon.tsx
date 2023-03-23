import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import type { FC, MouseEventHandler } from "react";
import { memo, useCallback, useState } from "react";

const startIcon = <FontAwesomeIcon icon={faCopy} />;

type Props = {
  content: string;
  text: string;
};

const CopyIcon: FC<Props> = ({ content, text }) => {
  const copiedText = `Copied Item ${text}!`;

  const [show, setShow] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShow(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => setShow(false), 1000);
  }, [content]);

  return (
    <Tooltip
      title={copiedText}
      open={show}>
      <Button
        className="fw-bold w-auto p-auto shadow-sm rounded-pill text-none"
        size="small"
        variant="contained"
        startIcon={startIcon}
        onClick={handleClick}>
        Copy Item {text}
      </Button>
    </Tooltip>
  );
};

CopyIcon.propTypes = {
  content: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default memo<Props>(CopyIcon);
