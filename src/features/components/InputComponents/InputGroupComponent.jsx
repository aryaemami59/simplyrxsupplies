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
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  memo,
  useTransition,
  useDeferredValue,
} from "react";
import PropTypes from "prop-types";

const empty = [];

function InputGroupComponent({ items }) {
  const [isPending, startTransition] = useTransition();
  const [listItems, setListItems] = useState(empty);
  const [val, setVal] = useState("");
  const { length } = listItems;

  const deferredVal = useDeferredValue(val);

  const listItemsSTR = JSON.stringify(listItems.map(({ name }) => name));

  // useEffect(() => {
  //   console.log(listItemsSTR);
  // }, [listItemsSTR]);

  // console.log(listItemsSTR);
  const list = useMemo(() => {
    return !!length ? listItems : empty;
    // return JSON.stringify(value);
  }, [listItemsSTR]);

  const getNewList = useCallback(
    itemObj => list.filter(e => e !== itemObj),
    [list]
  );

  // function getNewList(itemObj) {
  //   return listItems.filter(e => e !== itemObj);
  // }

  useEffect(() => {
    // console.log(list);
  }, [list]);

  useEffect(() => {
    // console.log("input");
  });

  const changeList = useCallback(
    e => {
      return setListItems(
        e.target.value
          ? items.filter(({ name }) =>
              name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          : empty
      );
    },
    [items]
  );

  const changeVal = e => {
    setVal(e.target.value);
    changeList(e);
    //   startTransition(() => {
    //   changeList(e);
    // });
  };

  // useEffect(() => {
  //   setListItems(
  //     items.filter(({ name }) =>
  //       name.toLowerCase().includes(deferredVal.toLowerCase())
  //     )
  //   );
  //   return () => setListItems(empty);
  // }, [deferredVal, items]);

  return (
    <>
      <Container fluid key={`Container`}>
        <Row key={"input group row"}>
          <InputGroup size="lg" className="my-4" key="Input Group">
            <Col md="10" className="p-0" key={"Column Input Group"}>
              <FormGroup
                className="mb-0"
                floating
                inline
                key={"form Input Group"}>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Search..."
                  type="email"
                  className="shadow"
                  bsSize="lg"
                  key={"input box"}
                  onChange={changeVal}
                  value={val}
                />
                <Label key={"input label"} for="exampleEmail">
                  Search...
                </Label>
              </FormGroup>
            </Col>
            <Col md="2" className="ps-0" key={"button input column"}>
              <Button
                key={"input search button"}
                size="lg"
                className="form-control shadow h-100"
                block>
                Search
              </Button>
            </Col>
          </InputGroup>
        </Row>
      </Container>
      {isPending ? (
        "searching..."
      ) : (
        <InputListItems
          listItems={list}
          getNewList={getNewList}
          setListItems={setListItems}
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
