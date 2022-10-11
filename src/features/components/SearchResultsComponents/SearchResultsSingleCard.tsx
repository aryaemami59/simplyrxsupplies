import { Card, CardContent } from "@mui/material";
import { FC, memo } from "react";
import { ItemName } from "../../../customTypes/types";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

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

export default memo<Props>(SearchResultsSingleCard);
