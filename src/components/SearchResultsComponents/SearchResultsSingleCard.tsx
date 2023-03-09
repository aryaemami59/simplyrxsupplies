// import { Card, CardContent } from "@mui/material";
// import PropTypes from "prop-types";
// import { forwardRef } from "react";
// import type { ItemName } from "../../types/api";
// import { itemNames, ItemName } from '../../types/api';
// import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
// const SearchResultsSingleCard = forwardRef<HTMLDivElement, Props>(
//   ({ itemName }, ref) => {
//     console.log(ref);

//     return (
//       <Card
//         ref={ref}
//         className="shadow"
//         variant="outlined"
//         key="Card-SingleInputListItems">
//         <CardContent
//           key="Card.Body-SingleInputListItems"
//           className="row gy- justify-content-center p-2">
//           <SearchResultsCardBodyContent itemName={itemName} />
//         </CardContent>
//       </Card>
//     );
//   }
// );

// SearchResultsSingleCard.displayName = "SearchResultsSingleCard";

// SearchResultsSingleCard.propTypes = {
//   itemName: PropTypes.oneOf(itemNames).isRequired,
// };

// export default SearchResultsSingleCard;
// export default memo<Props>(SearchResultsSingleCard);

import type { FC } from "react";
import { memo } from "react";
import type { ItemName } from "../../types/api";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

type Props = {
  itemName: ItemName;
};

const SearchResultsSingleCard: FC<Props> = ({ itemName }) => (
  <Card
    className="shadow"
    variant="outlined"
    key="Card-SingleInputListItems">
    <CardContent
      key="Card.Body-SingleInputListItems"
      className="row gy- justify-content-center p-2">
      <SearchResultsCardBodyContent itemName={itemName} />
    </CardContent>
  </Card>
);

export default memo<Props>(SearchResultsSingleCard);
