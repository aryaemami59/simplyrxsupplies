import { FC, memo } from "react";
import { Badge } from "react-bootstrap";
import { ItemName } from "../../../customTypes/types";
import { selectItemNumber } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemName: ItemName;
};

const SearchResultsItemNumber: FC<Props> = ({ itemName }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));

  return (
    <Badge
      key={`Badge-SearchResultsItemNumberComponent-${itemNumber}`}
      className="fs-6 fw-normal">
      Item Number: {itemNumber}
    </Badge>
  );
};

export default memo<Props>(SearchResultsItemNumber);
