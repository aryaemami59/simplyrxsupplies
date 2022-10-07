import { List } from "@mui/material";
import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { selectAllListItems } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import VendorColumnModalComponent from "../InputComponents/VendorColumnModalComponent";
import SearchResultsSingleCard from "./SearchResultsSingleCard";

const SearchResultsContainer: FC = () => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <>
      <VendorColumnModalComponent />
      <List className="mt-5 px-4">
        {listItems.map(itemObj => (
          <SearchResultsSingleCard
            itemObj={itemObj}
            key={`${itemObj.id}-inputListItems`}
          />
        ))}
      </List>
    </>
  );
};

export default memo(SearchResultsContainer);
