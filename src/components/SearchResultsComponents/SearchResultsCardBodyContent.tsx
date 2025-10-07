import { memo } from "react"
import { useVendorIdsByItemId } from "../../redux/selectors.js"
import { isEmptyArray } from "../../utils/predicates/isEmptyArray.js"
import SearchResultsAddButton from "./SearchResultsAddButton.js"
import SearchResultsItemName from "./SearchResultsItemName.js"
import SwitchComponent from "./SwitchComponent.js"

type Props = {
  readonly visibleListId: number
}

const SearchResultsCardBodyContent = ({ visibleListId }: Props) => {
  const vendorIds = useVendorIdsByItemId(visibleListId)

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
                    key={`SwitchComponent-${visibleListId.toString()}${vendorId.toString()}`}
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
  )
}

SearchResultsCardBodyContent.displayName = "SearchResultsCardBodyContent"

export default memo(SearchResultsCardBodyContent)
