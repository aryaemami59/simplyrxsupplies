import CloseIcon from "@mui/icons-material/Close"
import type { IconButtonProps } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"

type Props = Required<Pick<IconButtonProps, "onClick">>

export const InputEndAdornment = ({ onClick }: Props) => (
  <InputAdornment position="end">
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
)
