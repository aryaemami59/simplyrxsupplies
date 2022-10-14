import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemName } from "../../../../customTypes/types";
import { useAppSelector } from "../../../../Redux/hooks";
import { selectItemNumber } from "../../../../Redux/selectors";
import CopyIcon from "./CopyIcon";

type Props = {
  itemName: ItemName;
};

const RowItemNumber: FC<Props> = ({ itemName }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));

  return (
    <ListItem
      divider
      className="row row-cols-1 row-cols-sm-2">
      <ListItemText primaryTypographyProps={{ className: "ms-0" }}>
        Item Number: {itemNumber}
      </ListItemText>
      <CopyIcon
        content={itemNumber}
        text="Number"
      />
    </ListItem>
  );
};

export default memo<Props>(RowItemNumber);
