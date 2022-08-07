import { ListGroup, Container } from "reactstrap";
import {
  useState,
  useEffect,
  useMemo,
  memo,
  useContext,
  useId,
  useRef,
} from "react";
import PropTypes from "prop-types";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../inputSlice";
import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";

function InputListItems() {
  const listItems = useSelector(selectAllListItems, shallowEqual);
  // console.log(listItems)
  useEffect(() => {
    // console.log(jsbarcode(<img />).render());
  });
  // console.log("render input list items");

  useEffect(() => {
    // console.log("list items changed");
  }, [listItems]);
  return (
    // <ListGroup key={`InputGroupComponent-ListGroupItem`}>

    <ul className="list-group" key={`InputGroupComponent-ListGroupItem`}>
      {listItems.map(e => (
        // <Container key={`${i}-Container-${e.name}${e.itemNumber}`}>
        <SingleInputListItems
          itemObj={e}
          vendors={e.vendors}
          // listItems={listItems}
          // getNewList={getNewList}
          // setListItems={setListItems}
          key={`${e.name}-inputListItems`}
        />
        // {/* </Container> */}
      ))}
    </ul>
    // </ListGroup>
  );
}

InputListItems.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object),
  onAdd: PropTypes.func,
};

export default memo(
  InputListItems,
  (prev, next) =>
    JSON.stringify(prev.listItems) === JSON.stringify(next.listItems)
);
