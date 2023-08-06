import TextField from "@mui/material/TextField";
import type { ChangeEvent, CSSProperties, FC } from "react";
import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { shallowEqual } from "react-redux";

import useDependencyChangeLogger from "../../hooks/loggers/useDependencyChangeLogger";
import { clearListItems, setListItems } from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectItemNamesAndKeywords } from "../../redux/selectors";
import { SEARCH_FIELD_BG } from "../../shared/sharedStyles";
import search from "../../utils/search";
import InputEndAdornment from "./InputEndAdornment";

const style: CSSProperties = {
  borderRadius: "30px",
  backgroundColor: SEARCH_FIELD_BG,
};

const InputFieldComponent: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [, startTransition] = useTransition();
  const itemNamesAndKeywords = useAppSelector(
    selectItemNamesAndKeywords,
    shallowEqual
  );
  useDependencyChangeLogger(itemNamesAndKeywords, "itemNamesAndKeywords");
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = useCallback(() => {
    dispatch(clearListItems());
    setInputValue("");
    inputRef.current?.focus();
  }, [dispatch]);

  const changeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
      startTransition(() => {
        const listItems = search(value, itemNamesAndKeywords);
        // const listItems = search(value, itemNames);
        dispatch(setListItems(listItems));
      });
    },
    [dispatch, itemNamesAndKeywords]
  );

  const inputProps = useMemo(
    () => ({
      style,
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
