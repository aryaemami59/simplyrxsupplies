import { Card, Row, Col } from "react-bootstrap";
import { memo, useContext, FC } from "react";
import SearchResultsBarcodeImage from "./SearchResultsBarcodeImage";
import SearchResultsItemName from "./SearchResultsItemName";
import SearchResultsItemNumber from "./SearchResultsItemNumber";
import SwitchComponent from "./SwitchComponent";
import SearchResultsAddButton from "./SearchResultsAddButton";
import { DarkMode, myContextInterface } from "../../../App";
import { ItemObjType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { RootState } from "../../../Redux/store";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsSingleItem: FC<Props> = ({ itemObj }): JSX.Element => {
  const { darkTheme } = useContext<myContextInterface>(DarkMode);
  const ifCompact = useAppSelector((state: RootState) => state.added.compact);

  return (
    <Card
      bg={darkTheme ? "dark" : "light"}
      border="info"
      text={darkTheme ? "white" : "dark"}
      key={`Card-SingleInputListItems`}>
      <Card.Body
        key={`Card.Body-SingleInputListItems`}
        className="row gy-2 justify-content-center">
        <Col xs={ifCompact ? 6 : 12} md={12}>
          <Row className="m-0">
            <SearchResultsItemName
              itemObj={itemObj}
              key={`SearchResultsItemNameComponent-SingleInputListItems`}
            />
          </Row>
        </Col>
        {!ifCompact ? (
          <Col xs={ifCompact ? 6 : 12}>
            <Row className="mx-0">
              <SearchResultsItemNumber
                itemObj={itemObj}
                key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}
              />
            </Row>
          </Col>
        ) : (
          ""
        )}
        <Col xs={ifCompact ? 6 : 12} md={12}>
          <Row className="justify-content-center justify-content-sm-center align-items-center m-0 ">
            <Col
              xs={ifCompact ? 12 : 7}
              lg={ifCompact ? 12 : 8}
              className="pe-0">
              <Row md={"auto"} className="m-0">
                {itemObj.vendors.map(e => (
                  <SwitchComponent
                    key={`SwitchComponent-${itemObj.name}${e}`}
                    itemObj={itemObj}
                    vendorName={e}
                  />
                ))}
              </Row>
            </Col>
            {!ifCompact ? (
              <Col xs={5} lg={4}>
                <Row className="justify-content-center">
                  <SearchResultsBarcodeImage
                    itemObj={itemObj}
                    key={`SearchResultsBarcodeImageComponent-SingleInputListItems`}
                  />
                </Row>
              </Col>
            ) : (
              ""
            )}
          </Row>
        </Col>
        <Col xs={12}>
          <Row className="m-0">
            <SearchResultsAddButton
              itemObj={itemObj}
              key={`AddItemButtonComponent-SingleInputListItems`}
            />
          </Row>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default memo<Props>(SearchResultsSingleItem);
