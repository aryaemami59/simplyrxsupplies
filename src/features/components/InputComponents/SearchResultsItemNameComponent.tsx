import { Card } from "react-bootstrap";
import { memo, FC } from "react";
import { itemInterface } from "../../../addedSlice";

interface Props {
  itemObj: itemInterface;
}

const SearchResultsItemNameComponent: FC<Props> = ({
  itemObj,
}): JSX.Element => {
  return (
    <Card.Title
      className="bg-primary text-white p-3 m-0 rounded fw-normal"
      key={`Card.Title-${itemObj.name}-SearchResultsItemNameComponent`}>
      {itemObj.name}
    </Card.Title>
  );
};

export default memo<Props>(SearchResultsItemNameComponent);
