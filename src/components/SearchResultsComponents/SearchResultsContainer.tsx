import { List } from "@mui/material";
import type { FC } from "react";
import { Suspense, lazy, memo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { selectAllListItems } from "../../Redux/selectors";
import IsLoading from "../../shared/components/IsLoading";

const SearchResultsSingleCard = lazy(() => import("./SearchResultsSingleCard"));
const fallback = <IsLoading />;

const SearchResultsContainer: FC = () => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <>
      {/* <VendorColumnModalComponent /> */}
      <List
        dense
        className="mt-3 px-2">
        <Suspense fallback={fallback}>
          {listItems.map(itemName => (
            <SearchResultsSingleCard
              itemName={itemName}
              key={`${itemName}-inputListItems`}
            />
          ))}
        </Suspense>
      </List>
    </>
  );
};

export default memo(SearchResultsContainer);
