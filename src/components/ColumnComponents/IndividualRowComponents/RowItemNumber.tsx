import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import type { TypographyProps } from "@mui/material/Typography";
import type { FC } from "react";
import { memo } from "react";
import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../redux/hooks";
import { selectItemNumber } from "../../../redux/selectors";
import CopyIcon from "./CopyIcon";

const primaryTypographyProps: TypographyProps<"span", { component?: "span" }> =
  { className: "ms-0" };

const RowItemNumber: FC = () => {
  const itemName = useItemName();
  const itemNumber = useAppSelector(selectItemNumber(itemName));

  return (
    <ListItem
      divider
      className="row row-cols-1 row-cols-sm-2">
      <ListItemText primaryTypographyProps={primaryTypographyProps}>
        Item Number: {itemNumber}
      </ListItemText>
      <CopyIcon
        content={itemNumber}
        text="Number"
      />
    </ListItem>
  );
};

export default memo(RowItemNumber);
