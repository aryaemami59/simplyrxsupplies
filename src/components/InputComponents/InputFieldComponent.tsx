import { TextField } from "@mui/material";
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
import { clearListItems, setListItems } from "../../Redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { selectItemNamesArr } from "../../Redux/selectors";
import { SEARCH_FIELD_BG } from "../../shared/sharedStyles";
import search from "../../utils/search";
import InputEndAdornment from "./InputEndAdornment";

const style: CSSProperties = {
  borderRadius: "30px",
  backgroundColor: SEARCH_FIELD_BG,
};

const InputFieldComponent: FC = () => {
  const [val, setVal] = useState("");
  const [, startTransition] = useTransition();
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = useCallback(() => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current?.focus();
  }, [dispatch]);

  const changeVal = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setVal(value);
      startTransition(() => {
        const listItems = search(value, itemNames);
        dispatch(setListItems(listItems));
      });
    },
    [dispatch, itemNames]
  );

  const inputProps = useMemo(
    () => ({
      style,
      endAdornment: val && <InputEndAdornment clickHandler={clickHandler} />,
    }),
    [clickHandler, val]
  );

  return (
    <TextField
      fullWidth
      onChange={changeVal}
      value={val}
      label="Search"
      variant="outlined"
      className="mt-4"
      InputProps={inputProps}
    />
  );
};

export default memo(InputFieldComponent);
