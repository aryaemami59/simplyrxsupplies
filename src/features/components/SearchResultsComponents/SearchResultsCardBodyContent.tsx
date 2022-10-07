import { FC, memo } from "react";
import { ItemObjType } from "../../../customTypes/types";
import SearchResultsAddButton from "./SearchResultsAddButton";
import SearchResultsItemName from "./SearchResultsItemName";
import SwitchComponent from "./SwitchComponent";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsCardBodyContent: FC<Props> = ({ itemObj }) => {
  return (
    <>
      <div className={`col-md-12 col-12`}>
        <div className="m-0 row">
          <SearchResultsItemName itemObj={itemObj} />
        </div>
      </div>
      <div className={`col-md-12 col-12`}>
        <div className="justify-content-center justify-content-sm-center align-items-center m-0 row">
          <div className={`pe-0 col-lg-8 col-7`}>
            <div className="m-0 row w-100">
              {itemObj.vendors.map(vendorName => (
                <SwitchComponent
                  key={`SwitchComponent-${itemObj.name}${vendorName}`}
                  itemObj={itemObj}
                  vendorName={vendorName}
                />
              ))}
            </div>
          </div>
          <div className="col-5 col-lg-4">
            <div className="justify-content-center row">
              <SearchResultsAddButton itemObj={itemObj} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo<Props>(SearchResultsCardBodyContent);
