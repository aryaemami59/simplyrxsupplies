import { memo, useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setListItems } from "../../../addedSlice";

const empty = [];

function InputFieldComponent({ items }) {
  const dispatch = useDispatch();
  const [val, setVal] = useState("");

  const listItemsFunc = useCallback(
    e => {
      const trimmedValue = e.target.value.trim().toLowerCase();
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().includes(trimmedValue))
            .slice(0, 100)
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    e => {
      const listItems = listItemsFunc(e);
      setVal(e.target.value);

      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  return (
    <>
      <Form.Control
        placeholder="Search..."
        type="search"
        className="rounded-pill ps-4 mt-3 mb-5 text-white border-0 c-bg"
        key="input box"
        onChange={changeVal}
        value={val}
      />
    </>
  );
}

export default memo(InputFieldComponent);
