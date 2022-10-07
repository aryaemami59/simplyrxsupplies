import { CardHeader } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType } from "../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsItemName: FC<Props> = ({ itemObj }) => {
  return (
    <>
      <CardHeader title={itemObj.name} />
    </>
  );
};

export default memo<Props>(SearchResultsItemName);
