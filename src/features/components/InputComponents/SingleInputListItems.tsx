import { Card, Row, Col } from "react-bootstrap";
import { memo, useContext, FC } from "react";
import SearchResultsBarcodeImageComponent from "./SearchResultsBarcodeImageComponent";
import SearchResultsItemNameComponent from "./SearchResultsItemNameComponent";
import SearchResultsItemNumberComponent from "./SearchResultsItemNumberComponent";
import SwitchComponent from "./SwitchComponent";
import AddItemButtonComponent from "./AddItemButtonComponent";
// import PropTypes from "prop-types";
import { DarkMode } from "../../../App";
import { useSelector } from "react-redux";
import { itemInterface, stateInterface } from "../../../addedSlice";

interface Props {
  itemObj: itemInterface;
}

const SingleInputListItems: FC<Props> = ({ itemObj }): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const ifCompact = useSelector((state: stateInterface) => state.added.compact);

  return (
    <Card
      bg={darkTheme ? "dark" : "light"}
      border="info"
      text={darkTheme ? "white" : "dark"}
      key={`Card-SingleInputListItems`}>
      <Card.Body
        key={`Card.Body-SingleInputListItems`}
        className="row gy-2 justify-content-center">
        <Col xs={!ifCompact ? 12 : 6}>
          <Row className="m-0">
            <SearchResultsItemNameComponent
              itemObj={itemObj}
              key={`SearchResultsItemNameComponent-SingleInputListItems`}
            />
          </Row>
        </Col>
        {!ifCompact ? (
          <Col xs={!ifCompact ? 12 : 6}>
            <Row className="mx-0">
              <SearchResultsItemNumberComponent
                itemObj={itemObj}
                key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}
              />
            </Row>
          </Col>
        ) : (
          ""
        )}
        <Col xs={!ifCompact ? 12 : 6}>
          <Row className="justify-content-center justify-content-sm-center align-items-center m-0 ">
            <Col xs={7} md={12} lg={8} className="pe-0">
              <Row md={"auto"} className="m-0">
                {itemObj.vendors.map((e) => (
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
                  <SearchResultsBarcodeImageComponent
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
            <AddItemButtonComponent
              itemObj={itemObj}
              key={`AddItemButtonComponent-SingleInputListItems`}
            />
          </Row>
        </Col>
      </Card.Body>
    </Card>
  );
};

// SingleInputListItems.propTypes = {
//   vendors: PropTypes.arrayOf(PropTypes.string),
//   itemObj: PropTypes.shape({
//     name: PropTypes.string,
//     itemNumber: PropTypes.string,
//     keywords: PropTypes.arrayOf(PropTypes.string),
//     nav: PropTypes.arrayOf(PropTypes.string),
//     vendors: PropTypes.arrayOf(PropTypes.string),
//     src: PropTypes.string,
//   }),
// };

export default memo(SingleInputListItems);
