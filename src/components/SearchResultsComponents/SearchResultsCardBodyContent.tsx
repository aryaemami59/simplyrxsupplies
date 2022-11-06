import PropTypes from "prop-types";
import { FC, memo } from "react";
import SearchResultsAddButton from "./SearchResultsAddButton";
import SearchResultsItemName from "./SearchResultsItemName";
import SwitchComponent from "./SwitchComponent";
import { shallowEqual } from "react-redux";
import { ItemName, itemNames } from "../../custom_types/types";
import { useAppSelector } from "../../Redux/hooks";
import { selectVendorsByItemName } from "../../Redux/selectors";

type Props = {
  itemName: ItemName;
};

const SearchResultsCardBodyContent: FC<Props> = ({ itemName }) => {
  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );

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

SearchResultsCardBodyContent.propTypes = {
  itemName: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsCardBodyContent);
