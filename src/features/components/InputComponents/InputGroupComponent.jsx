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
// import { useSelector } from "react-redux";
// import { selectByVendor } from "../../../addedSlice";

const empty = [];

function InputGroupComponent({ items }) {
  const [listItems, setListItems] = useState(empty);
  // const addedItems = useSelector(selectByVendor);

  useEffect(() => {
    console.log("list items changed");
  }, [listItems]);
  // console.log("input render");

  const changeVal = e => {
    const it = e.target.value
      ? items.filter(({ name }) =>
          name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      : empty;
    setListItems(it);
  };

  // const list = useMemo(() => {
  //   return listItems;
  // }, [listItems]);

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
      {<InputListItems listItems={listItems} />}
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
