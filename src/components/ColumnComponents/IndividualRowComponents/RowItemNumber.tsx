import { ListItem, ListItemText, TypographyProps } from "@mui/material";
import { FC, memo } from "react";
import CopyIcon from "./CopyIcon";
import useItemName from "../../../hooks/useItemName";
import { useAppSelector } from "../../../Redux/hooks";
import { selectItemNumber } from "../../../Redux/selectors";

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
