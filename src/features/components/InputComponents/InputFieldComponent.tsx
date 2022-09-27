import { Form } from "react-bootstrap";
import {
  memo,
  useState,
  useCallback,
  useRef,
  FC,
  ChangeEvent,
  RefObject,
  MouseEventHandler,
  Dispatch,
} from "react";
import { shallowEqual } from "react-redux";
import {
  clearListItems,
  selectItemsArr,
  setListItems,
  itemInterface,
} from "../../../addedSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../../data/store";
import { SetStateAction } from "react";

const empty: [] = [];

const sortResults = (
  searchTerm: itemInterface,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.name.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.name.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.name.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.name.toLowerCase().match(re)) {
    return searchTerm.name.toLowerCase().match(re)!.length;
  }
  return 0;
};

const InputFieldComponent: FC = (): JSX.Element => {
  const items: itemInterface[] = useAppSelector<itemInterface[]>(
    selectItemsArr,
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const inputRef: RefObject<HTMLInputElement> = useRef<null>(null);

  const clickHandler: MouseEventHandler<SVGSVGElement> =
    useCallback((): void => {
      dispatch(clearListItems());
      setVal("");
      inputRef.current && inputRef.current.focus();
    }, [dispatch]);

  const [val, setVal]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");

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
        ? items
            .filter(({ name }) => name.toLowerCase().trim().match(re))
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
    (e: ChangeEvent<HTMLInputElement>): void => {
      const listItems: itemInterface[] = listItemsFunc(e);
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