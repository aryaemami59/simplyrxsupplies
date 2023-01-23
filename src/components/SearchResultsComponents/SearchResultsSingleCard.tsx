import { Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import type { ItemName } from "../../types/api";
import { itemNames } from "../../types/api";
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

SearchResultsSingleCard.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsSingleCard);
