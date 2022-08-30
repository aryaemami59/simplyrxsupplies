import { Form } from "react-bootstrap";
import { memo, useState, useCallback, useRef, FC } from "react";
import { shallowEqual } from "react-redux";
import {
  clearListItems,
  selectItemsArr,
  setListItems,
} from "../../../addedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { RefObject } from "react";
import { useAppSelector, useAppDispatch } from "../../../data/store";

const empty = [];

const InputFieldComponent: FC = (): JSX.Element => {
  const items = useAppSelector(selectItemsArr, shallowEqual);
  const dispatch = useAppDispatch();
  const inputRef: RefObject<HTMLInputElement> = useRef(null);

  const clickHandler = useCallback(() => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);
  const [val, setVal] = useState("");

  const listItemsFunc = useCallback(
    e => {
      const reg = e.target.value
        .trim()
        .split(/\s+/gi)
        .map((f: string) => `(${f})`)
        .join("|");
      const re = new RegExp(`${reg}`, "gi");
      const trimmedValue = e.target.value
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/, " ");
      // console.log(e.target.value.trim().toLowerCase().match())
      // console.log("relion insulin syringes".split(" "));
      // console.log(trimmedValue.split(" "));
      // console.log(
      //   "relion insulin syringes".split(" ").includes(trimmedValue.split(" "))
      // );
      // console.log(re);
      function sortResults(searchTerm: string, re: RegExp) {
        if (searchTerm === trimmedValue) {
          return 100;
        }
        if (searchTerm.startsWith(trimmedValue)) {
          console.log(searchTerm, 75);
          return 75;
        }
        if (searchTerm.includes(trimmedValue)) {
          return 50;
        }
        if (searchTerm.match(re)) {
          return searchTerm.match(re).length;
        }
        return 0;
      }
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().trim().match(re))
            .sort(
              (a, b) =>
                sortResults(b.name.toLowerCase().trim(), re) -
                sortResults(a.name.toLowerCase().trim(), re)
            )
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
};

export default memo(InputFieldComponent);
