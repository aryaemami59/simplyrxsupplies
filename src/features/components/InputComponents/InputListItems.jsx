import { ListGroup } from "react-bootstrap";
import { memo, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../addedSlice";

function InputListItems() {
  const listItems = useSelector(selectAllListItems, shallowEqual);

  // useEffect(() => {
  //   console.log("listItems");
  // }, [listItems]);
  // console.log(listItems)

  return (
    <ListGroup>
      {listItems.map(e => (
        <SingleInputListItems
          itemObj={e}
          vendors={e.vendors}
          key={`${e.name}-inputListItems`}
        />
      ))}
    </ListGroup>
  );
}

export default memo(InputListItems);
