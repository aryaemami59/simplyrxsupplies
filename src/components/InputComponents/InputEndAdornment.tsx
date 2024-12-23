import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import type { FC } from "react"
import { memo } from "react"

type Props = {
  clickHandler: () => void
}

const InputEndAdornment: FC<Props> = ({ clickHandler }) => (
  <InputAdornment position="end">
    <IconButton onClick={clickHandler}>
      <CloseIcon />
    </IconButton>
  </InputAdornment>
)

export default memo<Props>(InputEndAdornment)
