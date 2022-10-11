import { ListItem, ListItemText } from "@mui/material";
import { FC, memo } from "react";
import { ItemName } from "../../../../../customTypes/types";
import { selectItemNumber } from "../../../../../Redux/selectors";
import { useAppSelector } from "../../../../../Redux/hooks";
import CopyIcon from "../CopyIcon";

type Props = {
  itemName: ItemName;
};

const ModalItemNumber: FC<Props> = ({ itemName }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));

  return (
    <ListItem divider>
      <ListItemText>Item Number: {itemNumber}</ListItemText>
      <CopyIcon
        content={itemNumber}
        text={"Number"}
        // itemObj={itemObj}
        // vendorName={vendorName}
      />
    </ListItem>
  );
};

export default memo<Props>(ModalItemNumber);
