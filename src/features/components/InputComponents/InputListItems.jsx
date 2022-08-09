import { memo, useEffect, useDeferredValue } from "react";
import PropTypes from "prop-types";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../addedSlice";
import { useSelector, shallowEqual } from "react-redux";

function InputListItems() {
  const listItems = useSelector(selectAllListItems, shallowEqual);
  // const deferredListItems = useDeferredValue(listItems);

  useEffect(() => {
    // console.log("listItems changed");
  }, [listItems]);

  // useEffect(() => {
  //   // console.log("deferredListItems changed", deferredListItems);
  //   // console.log("listItems changed", listItems);
  // }, [deferredListItems, listItems]);

  useEffect(() => {
    // console.log("InputListItems mounts");
    // return () => console.log("InputListItems unmounts");
  }, []);

  useEffect(() => {
    // console.log("InputListItems renders");
  });

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
