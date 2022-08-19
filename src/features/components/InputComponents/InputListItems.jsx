import { ListGroup } from "react-bootstrap";
import { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../addedSlice";

function InputListItems() {
  const listItems = useSelector(selectAllListItems, shallowEqual);

  return (
    <ListGroup className="mt-5" key={`ListGroup-InputListItems`}>
      {listItems.map(e => (
        <SingleInputListItems itemObj={e} key={`${e.name}-inputListItems`} />
      ))}
    </ListGroup>
  );
}

export default memo(InputListItems);
