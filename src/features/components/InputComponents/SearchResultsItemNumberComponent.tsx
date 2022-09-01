import { Badge } from "react-bootstrap";
import { memo, FC } from "react";
import { itemInterface } from "../../../addedSlice";
// import PropTypes from "prop-types";

interface Props {
  itemObj: itemInterface;
}

const SearchResultsItemNumberComponent: FC<Props> = ({
  itemObj,
}): JSX.Element => {
  return (
    <Badge
      key={`Badge-SearchResultsItemNumberComponent-${itemObj.itemNumber}`}
      className="fs-6 fw-normal">
      Item Number: {itemObj.itemNumber}
    </Badge>
  );
};

export default memo<Props>(SearchResultsItemNumberComponent);
