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

function InputGroupComponent({ items }) {
  const [val, setVal] = useState("");
  const [listItems, setListItems] = useState([]);
  console.log("input render");

  // const searchResultsStr = useMemo(() => {
  //   return items
  //     .filter(({ name }) => name.toLowerCase().includes(val.toLowerCase()))
  //     .map(({ name }) => name)
  //     .join();
  // }, [items, val]);
  const searchResultsArr = useMemo(() => {
    return items.filter(({ name }) =>
      name.toLowerCase().includes(val.toLowerCase())
    );
  }, [items, val]);

  const changeItems = useCallback(() => {
    return setListItems(searchResultsArr);
  }, [searchResultsArr]);

  const changeVal = useCallback(e => {
    return setVal(e.target.value.trim());
  }, []);

  const list = useMemo(() => {
    return listItems;
  }, [listItems]);
  // const searchResultsArr = useMemo(() => {
  //   return items.filter(({ name }) =>
  //     name.toLowerCase().includes(val.toLowerCase())
  //   );
  // }, [searchResultsStr]);

  // const changeItems = useCallback(() => {
  //   return setListItems(searchResultsArr);
  // }, [searchResultsArr]);

  // useEffect(() => {
  //   changeItems();
  // }, [changeItems]);

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
                  onInput={changeItems}
                  onChange={changeVal}
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
      {<InputListItems listItems={list} />}
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