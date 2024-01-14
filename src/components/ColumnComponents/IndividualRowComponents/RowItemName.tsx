import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import type { TypographyProps } from "@mui/material/Typography"
import type { FC } from "react"
import { memo } from "react"

import useItemId from "../../../hooks/useItemId"
import { useItemName } from "../../../redux/selectors"
import CopyIcon from "./CopyIcon"

const primaryTypographyProps: TypographyProps<"span", { component?: "span" }> =
  { className: "ms-0" }

const RowItemName: FC = () => {
  const itemId = useItemId()
  const itemName = useItemName(itemId)

  return (
    <ListItem className="row row-cols-1 row-cols-sm-2" divider>
      <ListItemText primaryTypographyProps={primaryTypographyProps}>
        Item Name: {itemName}
      </ListItemText>
      <CopyIcon content={itemName} text="Name" />
    </ListItem>
  )
}

export default memo(RowItemName)
