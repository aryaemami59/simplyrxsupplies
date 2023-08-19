import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { FC } from "react";
import { memo } from "react";

import { SearchResultsItem } from "../../types/redux";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

type Props = {
  item: SearchResultsItem;
};

const SearchResultsSingleCard: FC<Props> = ({ item }) => {
  // const vendors = useAppSelector(selectVendorsByItemName(itemName));
  return (
    <Card
      key="Card-SingleInputListItems"
      className="shadow"
      variant="outlined">
      <CardContent
        key="Card.Body-SingleInputListItems"
        className="row gy- justify-content-center p-2">
        <SearchResultsCardBodyContent item={item} />
      </CardContent>
    </Card>
  );
};

export default memo<Props>(SearchResultsSingleCard);
