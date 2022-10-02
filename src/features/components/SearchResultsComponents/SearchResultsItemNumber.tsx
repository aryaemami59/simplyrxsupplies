import { Badge } from "react-bootstrap";
import { memo, FC } from "react";
import { ItemObjType } from "../../../customTypes/types";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsItemNumber: FC<Props> = ({ itemObj }): JSX.Element => {
  return (
    <Badge
      key={`Badge-SearchResultsItemNumberComponent-${itemObj.itemNumber}`}
      className="fs-6 fw-normal">
      Item Number: {itemObj.itemNumber}
    </Badge>
  );
};

export default memo<Props>(SearchResultsItemNumber);
