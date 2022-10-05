import { Card, CardContent } from "@mui/material";
import { FC, memo, useContext } from "react";
// import { Card } from "react-bootstrap";
import { DarkMode } from "../../../App";
import { ItemObjType } from "../../../customTypes/types";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsSingleCard: FC<Props> = ({ itemObj }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  // const theme = darkTheme ? "dark" : "light";

  return (
    <>
      <Card
        // bg={theme}
        // border="info"
        // text={theme}
        key={`Card-SingleInputListItems`}>
        <CardContent
          key={`Card.Body-SingleInputListItems`}
          className="row gy-2 justify-content-center">
          <SearchResultsCardBodyContent itemObj={itemObj} />
        </CardContent>
      </Card>
    </>
  );
};

export default memo<Props>(SearchResultsSingleCard);
