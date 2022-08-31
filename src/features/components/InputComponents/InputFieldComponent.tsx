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
import { itemInterface } from "../../../addedSlice";

const empty = [];

function sortResults(
  searchTerm: itemInterface,
  re: RegExp,
  trimmedValue: string
): number {
  // console.log(re.test(searchTerm));
  if (searchTerm.name.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.name.toLowerCase().startsWith(trimmedValue)) {
    // console.log(searchTerm.name.toLowerCase(), 75);
    return 75;
  }
  if (searchTerm.name.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.name.toLowerCase().match(re)) {
    return searchTerm.name.toLowerCase().match(re)!.length;
  }
  return 0;
}

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
      const trimmedValue = e.target.value
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/, " ");
      const reg = trimmedValue
        .split(/\s+/gi)
        .map((f: string, i: number, arr: string[]) =>
          i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
        )
        .join(".*");
      const looseReg = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re = new RegExp(`${reg}|${looseReg}`, "gi");
      // console.log(e.target.value.trim().toLowerCase().match())
      // console.log("relion insulin syringes".split(" "));
      // console.log(trimmedValue.split(" "));
      // console.log(
      //   "relion insulin syringes".split(" ").includes(trimmedValue.split(" "))
      // );
      console.log(re);
      // const jj = items.map(({ name }) => name.split(" "));
      // const splitVal = trimmedValue.split(" ");
      // const itemNames = items.map(({ name }) => name);

      // for (const val of splitVal) {
      //   console.log(val);
      //   console.log(itemNames.filter(e => e.toLowerCase().includes(val)));
      //   console.log(jj.filter(e => e.some(f => f === val)));
      //   console.log(jj.filter(e => e.every(f => f === val)));
      //   console.log(jj.filter(e => e.some(f => f.includes(val))));
      //   console.log(jj.filter(e => e.every(f => f.includes(val))));
      // }
      // console.log(items.filter(({name}) => name.split(" ").every((e) => e.includes())))
      // console.log(splitVal);
      // console.log(
      //   items.filter(({ name }) => [...name.toLowerCase().trim().matchAll(re)])
      // );
      // console.log(
      //   items
      //     .filter(({ name }) => re.test(name.toLowerCase().trim()))
      //     .map(({ name }) => name)
      // );
      // console.log(
      //   items
      //     .filter(({ name }) => name.toLowerCase().trim().match(re))
      //     .map(({ name }) => name)
      // );

      const testArr = items
        .filter(({ name }) => re.test(name.toLowerCase().trim()))
        .map(({ name }) => name);

      const matchArr = items
        .filter(({ name }) => name.toLowerCase().trim().match(re))
        .map(({ name }) => name);

      // console.log(matchArr);
      const intersectedArr = matchArr.filter(e => !testArr.includes(e));
      // console.log(intersectedArr);
      // console.log(intersectedArr.filter(e => e.match(re)));
      // console.log([
      //   ..."Nitrile Small Exam Gloves CareMates Brand 100 Count".matchAll(re),
      // ]);
      // console.log(intersectedArr.filter(e => e.match(re))[0].match(re));
      // console.log("4 oz Liquid Bottles".match(re));
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().trim().match(re))
            // .filter(({ name }) => re.test(name.toLowerCase().trim()))
            .slice(0, 100)
            .sort(
              (a, b) =>
                sortResults(b, re, trimmedValue) -
                sortResults(a, re, trimmedValue)
            )
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
