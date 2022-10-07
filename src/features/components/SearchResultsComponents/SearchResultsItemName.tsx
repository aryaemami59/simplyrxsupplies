import { CardHeader } from "@mui/material";
import { FC, memo } from "react";
// import { Card } from "react-bootstrap";
import { ItemObjType } from "../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsItemName: FC<Props> = ({ itemObj }) => {
  return (
    <>
      <CardHeader
        title={itemObj.name}
        // subheader={`Item Number: ${itemObj.itemNumber}`}
        // className="bg-primary text-white p-3 m-0 rounded fw-normal"
        key={`Card.Title-${itemObj.id}-SearchResultsItemNameComponent`}
      />
      {/* {itemObj.name} */}
    </>
  );
};

export default memo<Props>(SearchResultsItemName);
