import { List } from "@mui/material";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { shallowEqual } from "react-redux";
import useDependencyChangeLogger from "../../hooks/loggers/useDependencyChangeLogger";
import { useAppSelector } from "../../Redux/hooks";
import { selectAllListItems } from "../../Redux/selectors";
import IsLoading from "../../shared/components/IsLoading";
import SearchResultsSingleCard from "./SearchResultsSingleCard";

// const SearchResultsSingleCard = lazy(() => import("./SearchResultsSingleCard"));
// const InfiniteScroll = lazy(InfiniteScroll);
// const InfiniteScroll = lazy(() => import("react-infinite-scroll-component"));
const fallback = <IsLoading />;

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

  useDependencyChangeLogger(list, "list");
  useDependencyChangeLogger(listMemo, "listMemo");

  const next = useCallback(() => {
    console.log("next");
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
    <>
      {/* <VendorColumnModalComponent /> */}
      <List
        dense
        className="mt-3 px-2">
        {/* <Suspense fallback={fallback}> */}
        <InfiniteScroll
          next={next}
          hasMore={hasMore}
          scrollableTarget="App"
          loader={fallback}
          // scrollThreshold={1}
          dataLength={list.length}>
          {list.map(itemName => (
            <SearchResultsSingleCard
              itemName={itemName}
              key={`${itemName}-inputListItems`}
            />
          ))}
        </InfiniteScroll>
        {/* </Suspense> */}
      </List>
      {/* <Suspense fallback={fallback}>
          {list.map(itemName => (
            <SearchResultsSingleCard
              itemName={itemName}
              key={`${itemName}-inputListItems`}
            />
          ))}
        </Suspense> */}
    </>
  );
};

export default memo(SearchResultsContainer);
