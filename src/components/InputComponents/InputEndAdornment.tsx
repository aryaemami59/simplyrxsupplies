import CloseIcon from "@mui/icons-material/Close"
import type { IconButtonProps } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import type { InputAdornmentProps } from "@mui/material/InputAdornment"
import InputAdornment from "@mui/material/InputAdornment"
import type {
  DistributedOmit,
  DistributedPick,
  PropsWithoutChildren,
  Simplify,
} from "../../types/tsHelpers.js"

type Props = Simplify<
  Required<DistributedPick<IconButtonProps, "onClick">> & {
    readonly InputAdornmentProps?: PropsWithoutChildren<
      Partial<DistributedOmit<InputAdornmentProps, "key">>
    >
  }
>

export const InputEndAdornment = ({ InputAdornmentProps, onClick }: Props) => (
  <InputAdornment position="end" {...InputAdornmentProps}>
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
)
