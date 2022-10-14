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
    <ListItem divider>
      <ListItemText>Item Number: {itemNumber}</ListItemText>
      <CopyIcon
        content={itemNumber}
        text="Number"
      />
    </ListItem>
  );
};

export default memo<Props>(RowItemNumber);
