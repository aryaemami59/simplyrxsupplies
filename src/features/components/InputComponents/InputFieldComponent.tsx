import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEvent,
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useDeferredValue,
  useRef,
  useState,
  useTransition,
} from "react";
import { Form } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../customTypes/types";
import {
  clearListItems,
  selectItemNamesArr,
  setListItems,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

const empty: [] = [];

const sortResults = (
  searchTerm: ItemName,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.toLowerCase().match(re)) {
    return searchTerm.toLowerCase().match(re)!.length;
  }
  return 0;
};

const InputFieldComponent: FC = () => {
  const [val, setVal] = useState("");
  // const deferredVal = useDeferredValue(val);
  const [isPending, startTransition] = useTransition();
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null!);

  const clickHandler: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current?.focus();
  }, [dispatch]);

  const listItemsFunc = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const trimmedValue: string = e.target.value
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/, " ");
      const reg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string, i: number, arr: string[]) =>
          i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
        )
        .join(".*");
      const looseReg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re: RegExp = new RegExp(`${reg}|${looseReg}`, "gi");
      return trimmedValue
        ? itemNames
            .filter(itemName => itemName.toLowerCase().trim().match(re))
            .sort(
              (a, b) =>
                sortResults(b, re, trimmedValue) -
                sortResults(a, re, trimmedValue)
            )
            .slice(0, 100)
        : empty;
    },
    [itemNames]
  );

  const changeVal = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const listItems = listItemsFunc(e);
      setVal(e.target.value);
      startTransition(() => {
        dispatch(setListItems(listItems));
      });
      // dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  return (
    <>
      {/* <TextField
        autoFocus
        fullWidth
        onChange={changeVal}
        value={val}
        label="Search"
        variant="filled"
        className="rounded-pill ps-4 text-white c-bg"
      /> */}
      <Form.Control
        ref={inputRef}
        placeholder="Search..."
        type="search"
        className="rounded-pill ps-4 text-white border-0 c-bg"
        onChange={changeVal}
        value={val}
      />
      <>
        {val && (
          <FontAwesomeIcon
            onClick={clickHandler}
            className="rounded-circle p-2 position-absolute top-0 end-0 me-5 mt-1 text-white-50"
            size="2x"
            role="button"
            pull="right"
            focusable="auto"
            icon={faX}
          />
        )}
      </>
    </>
  );
};

export default memo(InputFieldComponent);
