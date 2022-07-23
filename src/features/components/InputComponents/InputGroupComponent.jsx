import {
  Button,
  InputGroup,
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  Container,
} from "reactstrap";
import InputListItems from "./InputListItems";
import React, { useEffect, useMemo, useState, useCallback, memo } from "react";
import PropTypes from "prop-types";

function InputGroupComponent({ items, onAdd, itemsAdded }) {
  const [val, setVal] = useState(() => "");
  const [listItems, setListItems] = useState(() => "");
  // const [listItems, setListItems] = useState(() => "");
  // const [match, setMatch] = useState(() => false);

  console.log("input render");
  // useEffect(() => {
  //   console.log("items changed");
  // }, [items]);

  const itemNames = useMemo(() => {
    // console.log("item names");
    const newArrStr = items.map(({ name }) => name);
    return newArrStr;
  }, [items]);

  // const filtered = useCallback(
  //   e => {
  //     return e.toLowerCase().includes(val.toLowerCase());
  //   },
  //   [val]
  // );

  useEffect(() => {
    // console.log(itemNames);
  }, [itemNames]);

  const searchResults = useMemo(() => {
    const newArray = itemNames.filter(e =>
      e.toLowerCase().includes(val.toLowerCase())
    );
    return newArray;
  }, [val, itemNames]);

  useEffect(() => {
    // console.log(searchResults);
  }, [searchResults]);

  const joinedItems = useMemo(() => {
    console.log("joined items");
    return searchResults.join();
  }, [searchResults]);

  const change = useCallback(() => {
    const myItems = items.filter(({ name }) =>
      name.toLowerCase().includes(val.toLowerCase())
    );
    return setListItems(myItems);
    // return setListItems(searchResults);
  }, [joinedItems]);

  useEffect(() => {
    console.log("set items");
    // setListItems(searchResults);
    change();
    // console.log(listItems);
  }, [change]);

  return (
    <>
      <Container fluid key={`Container`}>
        <Row>
          <InputGroup size="lg" className="my-4">
            <Col md="10" className="p-0">
              <FormGroup className="mb-0" floating inline>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Search..."
                  type="email"
                  className="shadow"
                  bsSize="lg"
                  onChange={e => setVal(e.target.value.trim())}
                  // onInput={e => setVal(e.target.value.trim())}
                />
                <Label for="exampleEmail">Search...</Label>
              </FormGroup>
            </Col>
            <Col md="2" className="ps-0">
              <Button size="lg" className="form-control shadow h-100" block>
                Search
              </Button>
            </Col>
          </InputGroup>
        </Row>
      </Container>
      {val && (
        <InputListItems
          itemsAdded={itemsAdded}
          onAdd={onAdd}
          listItems={listItems}
        />
      )}
    </>
  );
}

InputGroupComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

export default memo(InputGroupComponent);
