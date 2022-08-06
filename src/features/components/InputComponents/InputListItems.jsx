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
import vendorAbbr from "../../../data/vendorAbbr.json";
import SingleInputListItems from "./SingleInputListItems";

function InputListItems({ listItems, getNewList, setListItems }) {
  useEffect(() => {
    // console.log(jsbarcode(<img />).render());
  });
  // console.log("render input list items");

  useEffect(() => {
    // console.log("list items changed");
  }, [listItems]);
  return (
    <ListGroup key={`InputGroupComponent-ListGroupItem`}>
      {listItems.map((e, i) => (
        <Container key={`${i}-Container-${e.name}${e.itemNumber}`}>
          <SingleInputListItems
            itemObj={e}
            vendors={e.vendors.map(f => vendorAbbr[f])}
            listItems={listItems}
            getNewList={getNewList}
            setListItems={setListItems}
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
