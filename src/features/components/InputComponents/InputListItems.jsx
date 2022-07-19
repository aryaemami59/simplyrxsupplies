import { ListGroup, ListGroupItem, Container } from "reactstrap";
import { useState, useEffect, useMemo, memo } from "react";

// let renderCount = 0;
function InputListItems({ listItems }) {
  console.log("render input list items");
  // renderCount++;
  // console.log(renderCount);
  // const [render, setRender] = useState(0)
  // useEffect(() => {
  //   console.log(listItems);
  // }, [listItems]);
  // useEffect(() => {
  //   console.log(items());
  // }, [items]);
  // const [items, setListItems] = useState(() => []);
  // const changeItems = useMemo(() => {
  //   const newArray = items.filter(({ name }) =>
  //     name.toLowerCase().includes(val.trim().toLowerCase())
  //   );
  //   return newArray;
  // }, [val, items]);
  return (
    <>
      <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {listItems?.map((e, i) => (
          <Container key={`${i}-Container-${e}${e}`}>
            <ListGroupItem
              key={`${e}${e}${i}-SearchResults-ListGroupItem-name`}>
              {e}
            </ListGroupItem>
            {/* <ListGroupItem
              key={`${e.itemNumber}${e.name}${i}-SearchResults-ListGroupItem-itemNumber`}>
              {e.itemNumber}
            </ListGroupItem> */}
          </Container>
        ))}
      </ListGroup>
    </>
  );
}

export default memo(InputListItems);
// export default InputListItems;
