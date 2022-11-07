import PropTypes from "prop-types";
import { Card, CardContent } from "@mui/material";
import { FC, memo } from "react";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";
import { ItemName, itemNames } from "../../custom_types/api";

type Props = {
  itemName: ItemName;
};

const SearchResultsSingleCard: FC<Props> = ({ itemName }) => (
  <Card
    className="shadow"
    variant="outlined"
    key={`Card-SingleInputListItems`}>
    <CardContent
      key={`Card.Body-SingleInputListItems`}
      className="row gy-2 justify-content-center">
      <SearchResultsCardBodyContent itemName={itemName} />
    </CardContent>
  </Card>
);

SearchResultsSingleCard.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsSingleCard);
