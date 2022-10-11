import { List } from "@mui/material";
import { FC, lazy, memo, Suspense } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAllListItems } from "../../../Redux/selectors";
import VendorColumnModalComponent from "../InputComponents/VendorColumnModalComponent";
// import SearchResultsSingleCard from "./SearchResultsSingleCard";

const SearchResultsSingleCard = lazy(() => import("./SearchResultsSingleCard"));

const SearchResultsContainer: FC = () => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  // const slicedList = useMemo(() => listItems.slice(0, 10), [listItems]);

  // const [list, setList] = useState<ItemName[]>([]);

  // const loadMore = useCallback(
  //   (page: number) => {
  //     const newLength = list.length + 10;
  //     listItems.length && setList(listItems.slice(0, page * 10));
  //     console.log(page);
  //   },
  //   [listItems]
  // );

  return (
    <>
      <VendorColumnModalComponent />
      <Suspense>
        <List
          dense
          className="mt-5 px-4">
          {/* <div style={{ height: 700 }}> */}
          {/* <InfiniteScroll
          height={700}
          pageStart={0}
          hasMore={true || false}
          useWindow={false}
          loader={
            <div
              className="loader"
              key={0}>
              Loading ...
            </div>
          }
          loadMore={loadMore}> */}
          {/* <Suspense
          fallback={
            <div
              className="loader"
              key={0}>
              Loading ...
            </div>
          }> */}
          {listItems.map(itemName => (
            <SearchResultsSingleCard
              itemName={itemName}
              key={`${itemName}-inputListItems`}
            />
          ))}
          {/* </Suspense> */}
          {/* </InfiniteScroll> */}
          {/* </div> */}
        </List>
      </Suspense>
    </>
  );
};

export default memo(SearchResultsContainer);
