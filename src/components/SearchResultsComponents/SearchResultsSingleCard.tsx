import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { FC } from "react";
import { memo } from "react";

import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

type Props = {
  itemName: string;
};

const SearchResultsSingleCard: FC<Props> = ({ itemName }) => (
  <Card
    key="Card-SingleInputListItems"
    className="shadow"
    variant="outlined">
    <CardContent
      key="Card.Body-SingleInputListItems"
      className="row gy- justify-content-center p-2">
      <SearchResultsCardBodyContent itemName={itemName} />
    </CardContent>
  </Card>
);

export default memo<Props>(SearchResultsSingleCard);
