import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemName } from "../../../../customTypes/types";
import CopyIcon from "./CopyIcon";

type Props = {
  itemName: ItemName;
};

const RowItemName: FC<Props> = ({ itemName }) => (
  <ListItem
    divider
    className="row row-cols-1 row-cols-sm-2">
    <ListItemText primaryTypographyProps={{ className: "ms-0" }}>
      Item Name: {itemName}
    </ListItemText>
    <CopyIcon
      content={itemName}
      text="Name"
    />
  </ListItem>
);

export default memo<Props>(RowItemName);
