import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import { shallowEqual } from "react-redux";
import SearchResultsSingleCard from "./SearchResultsSingleCard";
import { selectAllListItems } from "../../../Redux/addedSlice";
import { useAppSelector } from "../../../Redux/hooks";
import VendorColumnModalComponent from "../InputComponents/VendorColumnModalComponent";

const SearchResultsContainer: FC = (): JSX.Element => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <>
      <VendorColumnModalComponent key={`VendorColumnModalComponent-`} />
      <ListGroup className="mt-5 px-xxl-4" key={`ListGroup-InputListItems`}>
        {listItems.map(e => (
          <SearchResultsSingleCard
            itemObj={e}
            key={`${e.name}-inputListItems`}
          />
        ))}
      </ListGroup>
    </>
  );
};

export default memo(SearchResultsContainer);
