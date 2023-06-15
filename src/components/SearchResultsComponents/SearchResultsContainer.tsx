import List from "@mui/material/List";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import { selectAllListItems } from "../../redux/selectors";
import IsLoading from "../../shared/components/IsLoading";
import SearchResultsSingleCard from "./SearchResultsSingleCard";

const loader = <IsLoading />;

const SearchResultsContainer: FC = () => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  const listMemo = useMemo(() => listItems.slice(0, 10), [listItems]);
  const [hasMore, setHasMore] = useState(false);
  const [list, setList] = useState(listMemo);

  useEffect(() => {
    setList(listMemo);
    if (listMemo.length === listItems.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [listItems.length, listMemo]);

  const next = useCallback(() => {
    setList(prev =>
      prev.concat(listItems.slice(prev.length, prev.length + 10))
    );
    if (list.length === listItems.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [list.length, listItems]);

  return (
    <List
      className="mt-3 px-1"
      dense>
      <InfiniteScroll
        dataLength={list.length}
        hasMore={hasMore}
        loader={loader}
        next={next}
        scrollableTarget="App">
        {list.map(itemName => (
          <SearchResultsSingleCard
            key={`${itemName}-inputListItems`}
            itemName={itemName}
          />
        ))}
      </InfiniteScroll>
    </List>
  );
};

export default memo(SearchResultsContainer);
