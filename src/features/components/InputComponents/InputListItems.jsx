import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { useState, useEffect, useMemo, memo, useContext } from "react";
import PropTypes from "prop-types";
// import AddedContext from "../ContextComponents/AddedContext";
import { myContext } from "../ContextComponents/AddedContext";
import { selectAllAddedNames } from "../../../addedSlice";
import { useSelector } from "react-redux";

function InputListItems({ listItems }) {
  const added = useSelector(selectAllAddedNames);
  // console.log("render input list items");
  const { itemsAdded, onAdd } = useContext(myContext);

  useEffect(() => {
    // console.log("list items changed");
  }, [listItems]);
  return (
    <>
      <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {listItems?.map((e, i) => (
          <Container key={`${i}-Container-${e}${e}`}>
            <ListGroupItem
              className={
                added.includes(e.name) ? "text-decoration-line-through" : ""
              }
              key={`${e}${e}${i}-SearchResults-ListGroupItem-name`}
              onClick={() => !itemsAdded.includes(e) && onAdd(e)}
              role="button">
              {e.name}
            </ListGroupItem>
          </Container>
        ))}
      </ListGroup>
    </>
  );
}

InputListItems.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object),
  onAdd: PropTypes.func,
};

export default memo(InputListItems);
// export default memo(
//   InputListItems,
//   (p, n) => p.listItems.length === 0 && n.listItems.length === 0
// );
