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
      <div
        // xs={ifCompact ? 6 : 12}
        // md={12}
        className={`col-md-12 col-${ifCompact ? 6 : 12}`}>
        <div className="m-0 row">
          <SearchResultsItemName
            itemObj={itemObj}
            key={`SearchResultsItemNameComponent-SingleInputListItems`}
          />
        </div>
      </div>
      {!ifCompact && (
        <div
          // xs={ifCompact ? 6 : 12}
          className={`col-${ifCompact ? 6 : 12}`}>
          <div className="mx-0 row">
            <SearchResultsItemNumber
              itemObj={itemObj}
              key={`SearchResultsItemNumberComponent-${itemObj.name}-${itemObj.itemNumber}`}
            />
          </div>
        </div>
      )}
      <div
        // xs={ifCompact ? 6 : 12}
        // md={12}
        className={`col-md-12 col-${ifCompact ? 6 : 12}`}>
        <div className="justify-content-center justify-content-sm-center align-items-center m-0 row">
          <div
            // xs={ifCompact ? 12 : 7}
            // lg={ifCompact ? 12 : 8}
            className={`pe-0 col-lg-${ifCompact ? 12 : 8} col-${
              ifCompact ? 12 : 7
            }`}>
            <div className="m-0 row row-cols-md-auto">
              {itemObj.vendors.map(e => (
                <SwitchComponent
                  key={`SwitchComponent-${itemObj.name}${e}`}
                  itemObj={itemObj}
                  vendorName={e}
                />
              ))}
            </div>
          </div>
          {!ifCompact && (
            <div
              className="col-5 col-lg-4"
              // xs={5}
              // lg={4}
            >
              <div className="justify-content-center row">
                <SearchResultsBarcodeImage
                  itemObj={itemObj}
                  key={`SearchResultsBarcodeImageComponent-SingleInputListItems`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        // xs={12}
        className="col-12">
        <div className="m-0 row">
          <SearchResultsAddButton
            itemObj={itemObj}
            key={`AddItemButtonComponent-SingleInputListItems`}
          />
        </div>
      </div>
    </>
  );
};

export default memo<Props>(SearchResultsCardBodyContent);
