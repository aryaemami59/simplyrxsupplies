import List from "@mui/material/List";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppSelector } from "../../redux/hooks";
import { searchResultsAdapterSelectors } from "../../redux/selectors";
import IsLoading from "../../shared/components/IsLoading";
import SearchResultsSingleCard from "./SearchResultsSingleCard";

const loader = <IsLoading />;

const SearchResultsContainer: FC = () => {
  const searchResultsIds = useAppSelector(
    searchResultsAdapterSelectors.selectIds
  );
  const memoizedSearchResultsIds = useMemo(
    () => searchResultsIds.slice(0, 10),
    [searchResultsIds]
  );
  const [hasMore, setHasMore] = useState(false);
  const [visibleListIds, setVisibleListIds] = useState(
    memoizedSearchResultsIds
  );

  useEffect(() => {
    setVisibleListIds(memoizedSearchResultsIds);
    if (memoizedSearchResultsIds.length === searchResultsIds.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [searchResultsIds.length, memoizedSearchResultsIds]);

  const next = useCallback(() => {
    setVisibleListIds(prev =>
      prev.concat(searchResultsIds.slice(prev.length, prev.length + 10))
    );
    if (visibleListIds.length === searchResultsIds.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [visibleListIds.length, searchResultsIds]);

  return (
    <List
      className="mt-3 px-1"
      dense>
      <InfiniteScroll
        dataLength={visibleListIds.length}
        hasMore={hasMore}
        loader={loader}
        next={next}
        scrollableTarget="App">
        {visibleListIds.map(visibleListId => (
          <SearchResultsSingleCard
            key={`${visibleListId}-inputListItems`}
            visibleListId={visibleListId}
          />
        ))}
      </InfiniteScroll>
    </List>
  );
};

export default memo(SearchResultsContainer);
