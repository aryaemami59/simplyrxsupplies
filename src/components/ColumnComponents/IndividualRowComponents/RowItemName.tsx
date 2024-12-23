import ListItem from "@mui/material/ListItem"
import type { ListItemTextProps } from "@mui/material/ListItemText"
import ListItemText from "@mui/material/ListItemText"
import type { FC } from "react"
import { memo } from "react"

import { useItemId } from "../../../hooks/useItemId"
import { useItemName } from "../../../redux/selectors"
import CopyIcon from "./CopyIcon"

const slotProps = {
  primary: {
    className: "ms-0",
  },
} as const satisfies ListItemTextProps["slotProps"]

const RowItemName: FC = () => {
  const itemId = useItemId()
  const itemName = useItemName(itemId)

  return (
    <ListItem className="row row-cols-1 row-cols-sm-2" divider>
      <ListItemText slotProps={slotProps}>Item Name: {itemName}</ListItemText>
      <CopyIcon content={itemName} text="Name" />
    </ListItem>
  )
}

export default memo(RowItemName)
