import { FC, memo } from "react";
import { ItemName } from "../../../customTypes/types";
import { selectVendorsByItemName } from "../../../Redux/selectors";
import { useAppSelector } from "../../../Redux/hooks";
import SearchResultsAddButton from "./SearchResultsAddButton";
import SearchResultsItemName from "./SearchResultsItemName";
import SwitchComponent from "./SwitchComponent";

type Props = {
  itemName: ItemName;
};

const SearchResultsCardBodyContent: FC<Props> = ({ itemName }) => {
  const vendors = useAppSelector(selectVendorsByItemName(itemName));

  return (
    <>
      <div className={`col-md-12 col-12`}>
        <div className="m-0 row">
          <SearchResultsItemName itemName={itemName} />
        </div>
      </div>
      <div className={`col-md-12 col-12`}>
        <div className="justify-content-center justify-content-sm-center align-items-center m-0 row">
          <div className={`pe-0 col-lg-8 col-7`}>
            <div className="m-0 row w-100">
              {vendors.map(vendorName => (
                <SwitchComponent
                  key={`SwitchComponent-${itemName}${vendorName}`}
                  itemName={itemName}
                  vendorName={vendorName}
                />
              ))}
            </div>
          </div>
          <div className="col-5 col-lg-4">
            <div className="justify-content-center row">
              <SearchResultsAddButton itemName={itemName} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo<Props>(SearchResultsCardBodyContent);
