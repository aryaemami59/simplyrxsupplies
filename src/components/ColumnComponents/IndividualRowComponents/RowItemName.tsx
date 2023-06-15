import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import type { TypographyProps } from "@mui/material/Typography";
import type { FC } from "react";
import { memo } from "react";

import useItemName from "../../../hooks/useItemName";
import CopyIcon from "./CopyIcon";

const primaryTypographyProps: TypographyProps<"span", { component?: "span" }> =
  { className: "ms-0" };

const RowItemName: FC = () => {
  const itemName = useItemName();

  return (
    <ListItem
      className="row row-cols-1 row-cols-sm-2"
      divider>
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
