import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import { selectVendorsByItemName } from "../../redux/selectors";
import { itemNames } from "../../types/aa";
import { SearchResultsItem } from "../../types/redux";
import SearchResultsAddButton from "./SearchResultsAddButton";
import SearchResultsItemName from "./SearchResultsItemName";
import SwitchComponent from "./SwitchComponent";

type Props = {
  item: SearchResultsItem;
};

const SearchResultsCardBodyContent: FC<Props> = ({ item }) => {
  const vendors = useAppSelector(selectVendorsByItemName(item), shallowEqual);

  return (
    <>
      <div className="col-md-12 col-12">
        <div className="m-0 row">
          <SearchResultsItemName item={item} />
        </div>
      </div>
      <div className="col-md-12 col-12">
        <div className="justify-content-center justify-content-sm-center align-items-center m-0 row">
          <div className="pe-0 col-lg-8 col-7">
            <div className="m-0 row w-100">
              {vendors.map(vendorName => (
                <SwitchComponent
                  key={`SwitchComponent-${item}${vendorName}`}
                  itemName={item}
                  vendorName={vendorName}
                  // vendors={vendors}
                />
              ))}
            </div>
          </div>
          <div className="col-5 col-lg-4">
            <div className="justify-content-center row">
              <SearchResultsAddButton itemName={item} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SearchResultsCardBodyContent.propTypes = {
  item: PropTypes.oneOf(itemNames).isRequired,
};

export default memo<Props>(SearchResultsCardBodyContent);
