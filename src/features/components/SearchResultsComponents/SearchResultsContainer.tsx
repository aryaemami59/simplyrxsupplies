import { FC, memo } from "react";
import { ListGroup } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { selectAllListItems } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import VendorColumnModalComponent from "../InputComponents/VendorColumnModalComponent";
import SearchResultsSingleCard from "./SearchResultsSingleCard";

const SearchResultsContainer: FC = (): JSX.Element => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <>
      <VendorColumnModalComponent key={`VendorColumnModalComponent-`} />
      <ListGroup
        className="mt-5 px-xxl-4"
        key={`ListGroup-InputListItems`}>
        {listItems.map(itemObj => (
          <SearchResultsSingleCard
            itemObj={itemObj}
            key={`${itemObj.id}-inputListItems`}
          />
        ))}
      </ListGroup>
    </>
  );
};

export default memo(SearchResultsContainer);
