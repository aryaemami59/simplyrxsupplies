import CloseIcon from "@mui/icons-material/Close"
import type { IconButtonProps } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import type { InputAdornmentProps } from "@mui/material/InputAdornment"
import InputAdornment from "@mui/material/InputAdornment"
import type { PropsWithoutChildren } from "../../types/tsHelpers.js"

type Props = Required<Pick<IconButtonProps, "onClick">> & {
  readonly InputAdornmentProps?: PropsWithoutChildren<
    Partial<InputAdornmentProps>
  >
}

export const InputEndAdornment = ({ InputAdornmentProps, onClick }: Props) => (
  <InputAdornment position="end" {...InputAdornmentProps}>
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
)
