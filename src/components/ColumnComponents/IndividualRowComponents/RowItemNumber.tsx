import ListItem from "@mui/material/ListItem"
import type { ListItemTextProps } from "@mui/material/ListItemText"
import ListItemText from "@mui/material/ListItemText"
import { useItemId } from "../../../hooks/useItemId.js"
import { useItemNumber } from "../../../redux/selectors.js"
import { CopyIcon } from "./CopyIcon.js"

const slotProps = {
  primary: {
    className: "ms-0",
  },
} as const satisfies ListItemTextProps["slotProps"]

export const RowItemNumber = () => {
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
