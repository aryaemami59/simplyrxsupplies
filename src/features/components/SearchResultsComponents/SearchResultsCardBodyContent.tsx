import { FC, memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ItemObjType } from "../../../customTypes/types";
import { useAppSelector } from "../../../Redux/hooks";
import { RootState } from "../../../Redux/store";
import SearchResultsAddButton from "./SearchResultsAddButton";
import SearchResultsBarcodeImage from "./SearchResultsBarcodeImage";
import SearchResultsItemName from "./SearchResultsItemName";
import SearchResultsItemNumber from "./SearchResultsItemNumber";
import SwitchComponent from "./SwitchComponent";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsCardBodyContent: FC<Props> = ({ itemObj }): JSX.Element => {
  const ifCompact = useAppSelector((state: RootState) => state.added.compact);

  return (
    <>
      <Col
        xs={ifCompact ? 6 : 12}
        md={12}>
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
      <Col
        xs={ifCompact ? 6 : 12}
        md={12}>
        <Row className="justify-content-center justify-content-sm-center align-items-center m-0 ">
          <Col
            xs={ifCompact ? 12 : 7}
            lg={ifCompact ? 12 : 8}
            className="pe-0">
            <Row
              md={"auto"}
              className="m-0">
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
            <Col
              xs={5}
              lg={4}>
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
    </>
  );
};

export default memo<Props>(SearchResultsCardBodyContent);
