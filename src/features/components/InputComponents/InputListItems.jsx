import { memo } from "react";
import PropTypes from "prop-types";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../inputSlice";
import { useSelector, shallowEqual } from "react-redux";

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

InputListItems.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object),
  onAdd: PropTypes.func,
};

export default memo(InputListItems);
