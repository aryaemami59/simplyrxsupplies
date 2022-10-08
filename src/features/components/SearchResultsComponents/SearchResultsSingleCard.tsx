import { Card, CardContent } from "@mui/material";
import { FC, memo } from "react";
import { ItemObjType } from "../../../customTypes/types";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsSingleCard: FC<Props> = ({ itemObj }) => (
  <Card
    className="shadow"
    variant="outlined"
    key={`Card-SingleInputListItems`}>
    <CardContent
      key={`Card.Body-SingleInputListItems`}
      className="row gy-2 justify-content-center">
      <SearchResultsCardBodyContent itemObj={itemObj} />
    </CardContent>
  </Card>
);

export default memo<Props>(SearchResultsSingleCard);
