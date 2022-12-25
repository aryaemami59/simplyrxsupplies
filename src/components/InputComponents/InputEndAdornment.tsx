import PropTypes from "prop-types";
import { InputAdornment, IconButton } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  clickHandler: () => void;
};

const InputEndAdornment: FC<Props> = ({ clickHandler }) => (
  <InputAdornment position="end">
    <IconButton onClick={clickHandler}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
);

InputEndAdornment.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default memo<Props>(InputEndAdornment);
