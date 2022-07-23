import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { useState, useEffect, useMemo, memo } from "react";
import PropTypes from "prop-types";

function InputListItems({ listItems, onAdd, itemsAdded }) {
  // console.log("render input list items");

  useEffect(() => {
    console.log("list items changed");
  }, [listItems]);
  return (
    <>
      <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {listItems?.map((e, i) => (
          <Container key={`${i}-Container-${e}${e}`}>
            <ListGroupItem
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
