import CloseIcon from "@mui/icons-material/Close"
import type { IconButtonProps } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import { memo } from "react"

type Props = Required<Pick<IconButtonProps, "onClick">>

const InputEndAdornment = ({ onClick }: Props) => (
  <InputAdornment position="end">
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
)

export default memo(InputEndAdornment)
