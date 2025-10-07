import CloseIcon from "@mui/icons-material/Close"
import type { IconButtonProps } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import type { FC } from "react"
import { memo } from "react"

type Props = Required<Pick<IconButtonProps, "onClick">>

const InputEndAdornment: FC<Props> = ({ onClick }) => (
  <InputAdornment position="end">
    <IconButton onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
)

export default memo<Props>(InputEndAdornment)
