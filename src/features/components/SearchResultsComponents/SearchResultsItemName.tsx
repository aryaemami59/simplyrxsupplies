import { Card } from "react-bootstrap";
import { memo, FC } from "react";
import { ItemObjType } from "../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsItemName: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <Card.Title
      className="bg-primary text-white p-3 m-0 rounded fw-normal"
      key={`Card.Title-${itemObj.name}-SearchResultsItemNameComponent`}>
      {itemObj.name}
    </Card.Title>
  );
};

export default memo<Props>(SearchResultsItemName);
