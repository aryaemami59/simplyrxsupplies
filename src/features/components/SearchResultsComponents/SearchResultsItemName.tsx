import { CardHeader } from "@mui/material";
import { FC, memo } from "react";
import { ItemName } from "../../../customTypes/types";

type Props = {
  itemName: ItemName;
};

const SearchResultsItemName: FC<Props> = ({ itemName }) => (
  <CardHeader title={itemName} />
);

export default memo<Props>(SearchResultsItemName);
