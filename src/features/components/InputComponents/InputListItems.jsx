import { memo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../addedSlice";

function InputListItems() {
  const listItems = useSelector(selectAllListItems, shallowEqual);

  return (
    <ul className="list-group" key={`InputGroupComponent-ListGroupItem`}>
      {listItems.map(e => (
        <SingleInputListItems
          itemObj={e}
          vendors={e.vendors}
          key={`${e.name}-inputListItems`}
        />
      ))}
    </ul>
  );
}

export default memo(InputListItems);
