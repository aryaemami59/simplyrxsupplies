import { Card } from "react-bootstrap";
import { memo, useContext, FC } from "react";
import { DarkMode, myContextInterface } from "../../../App";
import { ItemObjType } from "../../../customTypes/types";
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsSingleCard: FC<Props> = ({ itemObj }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);

  return (
    <Card
      bg={darkTheme ? "dark" : "light"}
      border="info"
      text={darkTheme ? "white" : "dark"}
      key={`Card-SingleInputListItems`}>
      <Card.Body
        key={`Card.Body-SingleInputListItems`}
        className="row gy-2 justify-content-center">
        <SearchResultsCardBodyContent itemObj={itemObj} />
      </Card.Body>
    </Card>
  );
};

export default memo<Props>(SearchResultsSingleCard);