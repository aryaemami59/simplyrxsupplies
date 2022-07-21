import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { useState, useEffect, useMemo, memo } from "react";
import PropTypes from "prop-types";

function InputListItems({ listItems }) {
  console.log("render input list items");
  return (
    <>
      <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {listItems?.map((e, i) => (
          <Container key={`${i}-Container-${e}${e}`}>
            <ListGroupItem
              key={`${e}${e}${i}-SearchResults-ListGroupItem-name`}>
              {e}
            </ListGroupItem>
          </Container>
        ))}
      </ListGroup>
    </>
  );
}

InputListItems.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string),
};

export default memo(InputListItems);
