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
import InputFieldComponent from "./InputFieldComponent";

const empty = [];

function InputGroupComponent({ items }) {
  // const empty = useMemo(() => {
  //   return [];
  // }, []);
  // const [isPending, startTransition] = useTransition();
  // const [listItems, setListItems] = useState(empty);
  // const [val, setVal] = useState("");
  // const { length } = listItems;

  // const deferredVal = useDeferredValue(val);

  // const listItemsSTR = JSON.stringify(listItems.map(({ name }) => name));
  // console.log(listItemsSTR);

  // useEffect(() => {
  //   console.log(listItemsSTR);
  // }, [listItemsSTR]);

  // console.log(listItemsSTR);
  // const list = useMemo(() => {
  //   return listItems;
  //   // return !!length ? listItems : empty;
  // }, [listItems]);

  // const getNewList = useCallback(
  //   itemObj => listItems.filter(e => e !== itemObj),
  //   [listItems]
  // );

  // function getNewList(itemObj) {
  //   return listItems.filter(e => e !== itemObj);
  // }

  // useEffect(() => {
  //   console.log(list);
  // }, [list]);

  // useEffect(() => {
  //   // console.log(listItems);
  // }, [listItems]);

  useEffect(() => {
    // console.log("input");
  });

  // const changeList = useCallback(
  //   e => {
  //     return setListItems(prev => {
  //       const next = items.filter(({ name }) =>
  //         name.toLowerCase().includes(e.target.value.toLowerCase())
  //       );
  //       // console.log(prev === empty);
  //       if (!next.length) {
  //         return empty;
  //       }
  //       return prev.length === next.length ? prev : next;
  //     });
  //   },
  //   [items]
  // );

  // const changeVal = useCallback(e => {
  //   return setVal(e.target.value);
  //   changeList(e);
  // }, []);

  // const changeVal = e => {
  //   setVal(e.target.value);
  //   changeList(e);
  //   //   startTransition(() => {
  //   //   changeList(e);
  //   // });
  // };

  // const changeVal = useCallback(() => {
  //   return changeValFunc;
  // }, [changeValFunc]);

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
      {/* <Container fluid key="Container-Input-Group"> */}
      <div>
        {/* <Row key="input group row"> */}
        <div className="row">
          <InputGroup size="lg" className="my-4" key="Input Group">
            {/* <Col md="10" className="p-0" key="Column Input Group"> */}
            <div className="p-0 col-md-10">
              <FormGroup
                className="mb-0"
                floating
                inline
                key="form Input Group">
                <InputFieldComponent
                  // changeVal={changeVal}
                  // val={val}
                  items={items}
                />
                {/* <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Search..."
                  type="email"
                  className="shadow"
                  bsSize="lg"
                  key="input box"
                  onChange={changeVal}
                  value={val}
                /> */}
                <Label key="input label" for="exampleEmail">
                  Search...
                </Label>
              </FormGroup>
            </div>
            {/* </Col> */}
            {/* <Col md="2" className="ps-0" key="button input column"> */}
            <div className="ps-0 col-md-2">
              <Button
                key="input search button"
                size="lg"
                className="form-control shadow h-100"
                block>
                Search
              </Button>
            </div>
            {/* </Col> */}
          </InputGroup>
        </div>
        {/* </Row> */}
      </div>
      {/* </Container> */}
      {
        // isPending ? (
        //   "searching..."
        // ) : (
        <InputListItems
        // listItems={listItems}
        // getNewList={getNewList}
        // setListItems={setListItems}
        />
        // )
      }
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
