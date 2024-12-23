import ListItem from "@mui/material/ListItem"
import type { ListItemTextProps } from "@mui/material/ListItemText"
import ListItemText from "@mui/material/ListItemText"
import type { FC } from "react"
import { memo } from "react"

import { useItemId } from "../../../hooks/useItemId"
import { useItemNumber } from "../../../redux/selectors"
import CopyIcon from "./CopyIcon"

const slotProps = {
  primary: {
    className: "ms-0",
  },
} as const satisfies ListItemTextProps["slotProps"]

const RowItemNumber: FC = () => {
  const itemId = useItemId()
  const itemNumber = useItemNumber(itemId)

  return (
    <ListItem className="row row-cols-1 row-cols-sm-2" divider>
      <ListItemText slotProps={slotProps}>
        Item Number: {itemNumber}
      </ListItemText>
      <CopyIcon content={itemNumber} text="Number" />
    </ListItem>
  )
}

export default memo(RowItemNumber)
