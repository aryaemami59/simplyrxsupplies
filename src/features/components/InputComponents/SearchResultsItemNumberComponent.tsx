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

// SearchResultsItemNumberComponent.propTypes = {
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };

export default memo(SearchResultsItemNumberComponent);
