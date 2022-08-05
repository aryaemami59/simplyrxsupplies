import { ListGroup, ListGroupItem, Container } from "reactstrap";
import {
  useState,
  useEffect,
  useMemo,
  memo,
  useContext,
  useId,
  useRef,
  createElement,
} from "react";
import PropTypes from "prop-types";
import SingleListItem from "../SingleListItemComponents/SingleListItem";
import vendorAbbr from "../../../data/vendorAbbr.json";
import SingleInputListItems from "./SingleInputListItems";
import jsbarcode from "jsbarcode";

function InputListItems({ listItems }) {
  // const elem = document.createElement("img");
  // const elem = createElement("img");
  // console.log(elem);
  // const myRef = useRef();
  // console.log(myRef);
  // const id = useId();
  // jsbarcode(elem, "hello");
  // const mysrc = elem.getAttribute("src");
  // console.log(mysrc);
  // console.log(jsbarcode(myRef, "hello").render());
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
          {/* <img src={mysrc} alt="" /> */}
          {/* <svg ref={myRef} id={`${id}`}></svg> */}
          {/* <svg
            className="barcode"
            jsbarcode-format="upc"
            jsbarcode-value="123456789012"
            jsbarcode-textmargin="0"
            jsbarcode-fontoptions="bold"></svg> */}
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
