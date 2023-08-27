import PropTypes from "prop-types";
import type { FC } from "react";
import { memo } from "react";

import { useAppSelector } from "../../redux/hooks";
import { selectVendorIdsByItemId } from "../../redux/selectors";
import isEmptyArray from "../../utils/predicates/isEmptyArray";
import SearchResultsAddButton from "./SearchResultsAddButton";
import SearchResultsItemName from "./SearchResultsItemName";
import SwitchComponent from "./SwitchComponent";

type Props = {
  visibleListId: number;
};

const SearchResultsCardBodyContent: FC<Props> = ({ visibleListId }) => {
  const vendorIds = useAppSelector(state =>
    selectVendorIdsByItemId(state, visibleListId)
  );

  return (
    <>
      <div className="col-md-12 col-12">
        <div className="m-0 row">
          <SearchResultsItemName visibleListId={visibleListId} />
        </div>
      </div>
      <div className="col-md-12 col-12">
        <div className="justify-content-center justify-content-sm-center align-items-center m-0 row">
          <div className="pe-0 col-lg-8 col-7">
            <div className="m-0 row w-100">
              {!isEmptyArray(vendorIds) &&
                vendorIds.map(vendorId => (
                  <SwitchComponent
                    key={`SwitchComponent-${visibleListId}${vendorId}`}
                    vendorId={vendorId}
                    visibleListId={visibleListId}
                  />
                ))}
            </div>
          </div>
          <div className="col-5 col-lg-4">
            <div className="justify-content-center row">
              <SearchResultsAddButton visibleListId={visibleListId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SearchResultsCardBodyContent.displayName = "SearchResultsCardBodyContent";

SearchResultsCardBodyContent.propTypes = {
  visibleListId: PropTypes.number.isRequired,
};

SearchResultsCardBodyContent.whyDidYouRender = true;

export default memo<Props>(SearchResultsCardBodyContent);
