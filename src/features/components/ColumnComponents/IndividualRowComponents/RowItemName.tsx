import { ListItem, ListItemText, TypographyProps } from "@mui/material";
import { FC, memo } from "react";
import useItemName from "../../../customHooks/useItemName";
import CopyIcon from "./CopyIcon";

const primaryTypographyProps: TypographyProps<"span", { component?: "span" }> =
  { className: "ms-0" };

const RowItemName: FC = () => {
  const itemName = useItemName();

  return (
    <ListItem
      divider
      className="row row-cols-1 row-cols-sm-2">
      <ListItemText primaryTypographyProps={primaryTypographyProps}>
        Item Name: {itemName}
      </ListItemText>
      <CopyIcon
        content={itemName}
        text="Name"
      />
    </ListItem>
  );
};

export default memo(RowItemName);
