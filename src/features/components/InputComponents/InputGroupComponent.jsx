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
import { useSelector } from "react-redux";
import { selectAllItems } from "../../../itemsSlice";

function InputGroupComponent({ items }) {
  // const items = useSelector(selectAllItems);
  // console.log(items);
  // const [val, setVal] = useState("");
  const [listItems, setListItems] = useState([]);
  console.log("input render");

  const changeVal = e => {
    const it = e.target.value
      ? items.filter(({ name }) =>
          name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      : [];
    setListItems(it);
  };
  // console.log(val)
  // const searchResultsStr = useMemo(() => {
  //   return items
  //     .filter(({ name }) => name.toLowerCase().includes(val.toLowerCase()))
  //     .map(({ name }) => name)
  //     .join();
  // }, [items, val]);

  // const searchResultsArr = useMemo(() => {
  //   return val.length
  //     ? items.filter(({ name }) =>
  //         name.toLowerCase().includes(val.toLowerCase())
  //       )
  //     : [];
  //   // return items.filter(({ name }) =>
  //   //   name.toLowerCase().includes(val.toLowerCase())
  //   // );
  // }, [val, items]);
  // console.log(searchResultsArr);

  // const changeItems = useCallback(() => {
  //   return setListItems(searchResultsArr);
  // }, [searchResultsArr]);
  // const changeItems = e => {
  //   setVal(e.target.value.trim());
  //   setListItems(searchResultsArr);
  // };

  // const changeVal = useCallback(e => {
  //   return changeItems(e);
  // }, []);

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
                  onInput={changeVal}
                  // onChange={changeVal}
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
