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
import { clearListItems, setListItems } from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { selectItemNamesArr } from "../../../Redux/selectors";
import { SEARCH_FIELD_BG } from "../../shared/sharedStyles";
import { search } from "../../shared/utilityFunctions";

const InputFieldComponent: FC = () => {
  const [val, setVal] = useState("");
  const [_isPending, startTransition] = useTransition();
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
      const listItems = search(e, itemNames);
      setVal(e.target.value);
      startTransition(() => {
        dispatch(setListItems(listItems));
      });
    },
    [dispatch, itemNames]
  );

  return (
    <TextField
      autoFocus
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
