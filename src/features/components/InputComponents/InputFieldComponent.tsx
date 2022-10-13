import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useRef,
  useState,
  useTransition,
} from "react";
import { shallowEqual } from "react-redux";
import { ItemName } from "../../../customTypes/types";
import { clearListItems, setListItems } from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { selectItemNamesArr } from "../../../Redux/selectors";
import { SEARCH_FIELD_BG } from "../../shared/sharedStyles";
import { emptyArr, search, sortResults } from "../../shared/utilityFunctions";

const InputFieldComponent: FC = () => {
  const [val, setVal] = useState("");
  const [_isPending, startTransition] = useTransition();
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback((
    e: ChangeEvent<HTMLInputElement>,
    itemNames: ItemName[]
  ) => {
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
    const re = new RegExp(
      `${reg}|${looseReg}
    `,
      "gi"
    );
    return trimmedValue
      ? itemNames
          .filter(itemName => itemName.toLowerCase().trim().match(re))
          .sort(
            (a, b) =>
              sortResults(b, re, trimmedValue) - sortResults(a, re, trimmedValue)
          )
          .slice(0, 100)
      : emptyArr;
  }, []);

  const clickHandler = useCallback(() => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current?.focus();
  }, [dispatch]);

  const changeVal = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value);
      const listItems = search(e, itemNames);
      startTransition(() => {
        dispatch(setListItems(listItems));
      });
    },
    [dispatch, itemNames]
  );

  return (
    <TextField
      fullWidth
      onChange={changeVal}
      value={val}
      label="Search"
      variant="outlined"
      className="mt-4"
      InputProps={{
        style: { borderRadius: "30px", backgroundColor: SEARCH_FIELD_BG },
        endAdornment: (
          <>
            {val && (
              <InputAdornment position="end">
                <IconButton onClick={clickHandler}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            )}
          </>
        ),
      }}
    />
  );
};

export default memo(InputFieldComponent);
