import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { useState, useEffect, useMemo, memo, useContext } from "react";
import PropTypes from "prop-types";
import SingleListItem from "../SingleListItemComponents/SingleListItem";
import vendorAbbr from "../../../data/vendorAbbr.json";
import SingleInputListItems from "./SingleInputListItems";

function InputListItems({ listItems }) {
  // console.log("render input list items");

  useEffect(() => {
    // console.log("list items changed");
  }, [listItems]);
  return (
    <ListGroup key={`InputGroupComponent-ListGroupItem`}>
      {listItems.map((e, i) => (
        <Container key={`${i}-Container-${e.name}${e.itemNumber}`}>
          {/* <SingleListItem
              itemObj={e}
              vendorName={vendorAbbr[e.vendors[0]]}
              vendors={e.vendors.map(f => vendorAbbr[f])}
            /> */}
          {/* {e.name} */}
          {/* <ListGroupItem
              key={`${e}${e}${i}-SearchResults-ListGroupItem-name`}
              role="button">
              {e.name}
            </ListGroupItem> */}
          <SingleInputListItems
            itemObj={e}
            vendors={e.vendors.map(f => vendorAbbr[f])}
          />
        </Container>
      ))}
    </ListGroup>
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
