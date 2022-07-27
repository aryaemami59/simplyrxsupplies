import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { useState, useEffect, useMemo, memo, useContext } from "react";
import PropTypes from "prop-types";
// import AddedContext from "../ContextComponents/AddedContext";
import { myContext } from "../ContextComponents/AddedContext";

function InputListItems({ listItems }) {
  console.log("render input list items");
  const { itemsAdded, onAdd } = useContext(myContext);

  useEffect(() => {
    console.log("list items changed");
  }, [listItems]);
  return (
    <>
      <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {listItems?.map((e, i) => (
          <Container key={`${i}-Container-${e}${e}`}>
            <ListGroupItem
              className={
                itemsAdded.includes(e) ? "text-decoration-line-through" : ""
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
