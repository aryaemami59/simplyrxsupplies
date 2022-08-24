import { Form } from "react-bootstrap";
import { memo, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  clearListItems,
  selectItemsArr,
  setListItems,
} from "../../../addedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { RefObject } from "react";

const empty = [];

function InputFieldComponent() {
  const items = useSelector(selectItemsArr, shallowEqual);
  const dispatch = useDispatch();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const clickHandler = useCallback(() => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);
  const [val, setVal] = useState("");

  const listItemsFunc = useCallback(
    (e) => {
      const reg = e.target.value.split(/\s+/gi);
      const itemNames = items.map(({ name }) => name.split(/\s+/gi));
      console.log(
        itemNames.filter((f) => f.includes(e.target.value.trim().toLowerCase()))
      );
      // console.log(itemNames);

      console.log(reg);
      // console.log(
      //   items.filter(({ name }) => name.toLowerCase().includes(trimmedValue))
      // );
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
    (e) => {
      const listItems = listItemsFunc(e);
      setVal(e.target.value);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  return (
    <>
      <Form.Control
        ref={inputRef}
        placeholder="Search..."
        type="search"
        className="rounded-pill ps-4 text-white border-0 c-bg"
        key={`Form.Control-InputFieldComponent`}
        onChange={changeVal}
        value={val}
      />
      <FontAwesomeIcon
        onClick={clickHandler}
        className="btn btn-lg rounded-circle position-absolute top-0 end-0 mt-1 me-5 text-white-50"
        size="2x"
        transform=""
        role="button"
        inverse
        pull="right"
        focusable="auto"
        icon={faX}
        key={`FontAwesomeIcon-`}
      />
    </>
  );
}

export default memo(InputFieldComponent);
