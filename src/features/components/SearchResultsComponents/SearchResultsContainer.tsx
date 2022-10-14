import { List } from "@mui/material";
import { FC, lazy, memo, Suspense } from "react";
import { shallowEqual } from "react-redux";
import IsLoading from "../../shared/IsLoading";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAllListItems } from "../../../Redux/selectors";
import VendorColumnModalComponent from "../InputComponents/VendorColumnModalComponent";

const SearchResultsSingleCard = lazy(() => import("./SearchResultsSingleCard"));

const SearchResultsContainer: FC = () => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <>
      <VendorColumnModalComponent />
      <List
        dense
        className="mt-5 px-4">
        <Suspense fallback={<IsLoading />}>
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
