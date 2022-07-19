import {
  Button,
  InputGroup,
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import InputListItems from "./InputListItems";
import React, { useEffect, useMemo, useState, useCallback } from "react";

function InputGroupComponent({ items }) {
  const [val, setVal] = useState(() => "");
  const [listItems, setListItems] = useState(() => "");
  const [match, setMatch] = useState(() => false);

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

  // useEffect(() => {
  //   console.log(itemNames);
  // }, [itemNames]);

  const searchResults = useMemo(() => {
    const newArray = itemNames.filter(e =>
      e.toLowerCase().includes(val.toLowerCase())
    );
    return newArray;
  }, [val, itemNames]);

  const joinedItems = useMemo(() => {
    // console.log("joined items");
    return searchResults.join();
  }, [searchResults]);

  useEffect(() => {
    // console.log("set items");
    setListItems(searchResults);
    // console.log(listItems);
  }, [joinedItems]);

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
                  onInput={e => setVal(e.target.value.trim())}
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
      {val && <InputListItems listItems={listItems} />}
      {/* <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {val &&
          listItems?.map((e, i) => (
            <Container key={`${i}-Container-${e.name}${e.itemNumber}`}>
              <ListGroupItem
                key={`${e.name}${e.itemNumber}${i}-SearchResults-ListGroupItem-name`}>
                {e.name}
              </ListGroupItem>
              <ListGroupItem
                key={`${e.itemNumber}${e.name}${i}-SearchResults-ListGroupItem-itemNumber`}>
                {e.itemNumber}
              </ListGroupItem>
            </Container>
          ))}
      </ListGroup> */}
    </>
  );
}

export default InputGroupComponent;
