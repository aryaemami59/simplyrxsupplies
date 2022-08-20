import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../addedSlice";
import VendorColumnModalComponent from "./VendorColumnModalComponent";

function InputListItems() {
  const listItems = useSelector(selectAllListItems, shallowEqual);

  return (
    <>
      <VendorColumnModalComponent key={`VendorColumnModalComponent-`} />
      <ListGroup className="mt-5 px-xxl-4" key={`ListGroup-InputListItems`}>
        {listItems.map(e => (
          <SingleInputListItems itemObj={e} key={`${e.name}-inputListItems`} />
        ))}
      </ListGroup>
    </>
  );
}

export default memo(InputListItems);
