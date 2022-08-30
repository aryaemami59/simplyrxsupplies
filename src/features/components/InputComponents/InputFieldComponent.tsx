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
      // const reg = e.target.value.replace(/\s+/gi, "");
      const reg = e.target.value
        .trim()
        .split(/\s+/gi)
        .map((f: string, i: number, arr: string[]) => `(${f})`)
        .join("|");
      // const reg = e.target.value
      //   .trim()
      //   .split(/\s+/gi)
      //   .map((f: string, i: number, arr: string[]) =>
      //     i !== arr.length - 1 ? `(${f}\\s)` : `(${f})`
      //   )
      //   .join("?.*");
      // console.log(reg);
      // const re = new RegExp(`${e.target.value}`, "gi");
      const re = new RegExp(`${reg}`, "gi");
      // const re = new RegExp(`(relion\\s)?(novolin\\s)?(r\\s)?(vial)`, "gi");
      // console.log(re);
      // console.log(re.test("relion novolin r vial"));
      // console.log(re.exec("relion insulin syringes"));
      // console.log([
      //   ...'ReliOn Insulin Syringes 6mm(15/64") 3/10 mL(Purple Strips)'.matchAll(
      //     re
      //   ),
      // ]);
      console.log(
        [..."Monoject 1 ml Oral Syringes Used For FlavoRX".matchAll(re)].length
      );
      // console.log(
      //   re.test('ReliOn Insulin Syringes 6mm(15/64") 3/10 mL(Purple Strips)')
      // );
      // console.log([..."relion insulin syringes".matchAll(re)]);
      // console.log("relion insulin syringes".match(re));

      // const reg = e.target.value.split(/\s+/gi);
      // console.log(reg);
      const itemNames = items.map(({ name }) => name);
      console.log(itemNames.filter(e => [...e.matchAll(re)].length));
      // const itemNames = items.map(({ name }) => name.split(/\s+/gi));
      // console.log(itemNames.filter(e => e.match(re)));
      // console.log(itemNames);

      // console.log(reg);
      // console.log(
      //   items.filter(({ name }) => name.toLowerCase().includes(trimmedValue))
      // );
      const trimmedValue = e.target.value.trim().toLowerCase();
      function sortResults(
        searchTerm: string,
        trimmedValue: string,
        re: RegExp
      ) {
        // if (searchTerm === trimmedValue) {
        //   return 5;
        // }
        // if (searchTerm.startsWith(trimmedValue)) {
        //   return 4;
        // }
        // if (searchTerm.includes(trimmedValue)) {
        //   return 3;
        // }
        if ([...searchTerm.matchAll(re)].length) {
          console.log(searchTerm, [...searchTerm.matchAll(re)]);
          // console.log(searchTerm, 2);
          return [...searchTerm.matchAll(re)].length;
        }
        // console.log(searchTerm, 0);
        return 0;
      }
      return trimmedValue
        ? // .filter(({ name }) => name.toLowerCase().includes(trimmedValue))
          items
            // .filter(({ name }) => re.test(name.toLowerCase()))
            .filter(({ name }) => [...name.toLowerCase().matchAll(re)].length)
            .sort(
              (a, b) =>
                sortResults(b.name.toLowerCase().trim(), trimmedValue, re) -
                sortResults(a.name.toLowerCase().trim(), trimmedValue, re)
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
