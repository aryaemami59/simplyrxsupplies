import List from "@mui/material/List";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { selectAllListItems } from "../../Redux/selectors";
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
      dense
      className="mt-3 px-1">
      <InfiniteScroll
        next={next}
        hasMore={hasMore}
        scrollableTarget="App"
        loader={loader}
        dataLength={list.length}>
        {list.map(itemName => (
          <SearchResultsSingleCard
            itemName={itemName}
            key={`${itemName}-inputListItems`}
          />
        ))}
      </InfiniteScroll>
    </List>
  );
};

export default memo(SearchResultsContainer);
