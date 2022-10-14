import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemName } from "../../../../customTypes/types";
import CopyIcon from "./CopyIcon";

type Props = {
  itemName: ItemName;
};

const RowItemName: FC<Props> = ({ itemName }) => (
  <ListItem divider>
    <ListItemText primaryTypographyProps={{ className: "pe- mw-7 ms-0" }}>
      Item Name: {itemName}
    </ListItemText>
    <CopyIcon
      content={itemName}
      text={"Name"}
    />
  </ListItem>
);

export default memo<Props>(RowItemName);
