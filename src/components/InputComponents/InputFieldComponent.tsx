import type { OutlinedInputProps } from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import type { ChangeEventHandler, CSSProperties, FC } from "react";
import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { clearSearchResults, setSearchResults } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectItemNamesAndKeywords } from "../../redux/selectors";
import { SEARCH_FIELD_BG } from "../../shared/styles";
import EMPTY_ARRAY from "../../utils/emptyArray";
import isEmptyArray from "../../utils/predicates/isEmptyArray";
import search from "../../utils/search/search";
import withEmptyArrayFallback from "../../utils/withEmptyArrayFallback";
import InputEndAdornment from "./InputEndAdornment";

const style: CSSProperties = {
  borderRadius: "30px",
  backgroundColor: SEARCH_FIELD_BG,
};

const InputFieldComponent: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [, startTransition] = useTransition();
  const itemNamesAndKeywords = useAppSelector(selectItemNamesAndKeywords);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = useCallback(() => {
    dispatch(clearSearchResults());
    setInputValue("");
    inputRef.current?.focus();
  }, [dispatch]);

  const changeValue = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const { value } = event.target;
      setInputValue(value);
      startTransition(() => {
        const listItems = withEmptyArrayFallback(
          search(value, itemNamesAndKeywords)
        );
        const searchResultsIds = isEmptyArray(listItems)
          ? EMPTY_ARRAY
          : listItems.map<number>(({ id }) => id);
        if (isEmptyArray(searchResultsIds)) {
          dispatch(clearSearchResults());
        }
        dispatch(setSearchResults(searchResultsIds));
      });
    },
    [dispatch, itemNamesAndKeywords]
  );

  const inputProps = useMemo<OutlinedInputProps>(
    () => ({
      style,
      inputProps: {
        role: "search",
      },
      endAdornment: inputValue && (
        <InputEndAdornment clickHandler={clickHandler} />
      ),
    }),
    [clickHandler, inputValue]
  );

  return (
    <TextField
      className="mt-4"
      fullWidth
      autoFocus
      InputProps={inputProps}
      inputRef={inputRef}
      label="Search"
      onChange={changeValue}
      value={inputValue}
      variant="outlined"
    />
  );
};

export default memo(InputFieldComponent);
