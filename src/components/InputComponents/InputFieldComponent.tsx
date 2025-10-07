import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"
import type { CSSProperties, ChangeEventHandler, FC } from "react"
import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react"
import {
  searchResultsCleared,
  searchResultsUpdated,
} from "../../redux/addedSlice.js"
import { useAppDispatch, useAppSelector } from "../../redux/hooks.js"
import { selectItemNamesAndKeywords } from "../../redux/selectors.js"
import { SEARCH_FIELD_BG } from "../../shared/styles.js"
import { EMPTY_ARRAY } from "../../utils/emptyArray.js"
import { fallbackToEmptyArray } from "../../utils/fallbackToEmptyArray.js"
import { isEmptyArray } from "../../utils/predicates/isEmptyArray.js"
import { search } from "../../utils/search/search.js"
import InputEndAdornment from "./InputEndAdornment.js"

const style: CSSProperties = {
  borderRadius: "30px",
  backgroundColor: SEARCH_FIELD_BG,
}

const InputFieldComponent: FC = () => {
  const [inputValue, setInputValue] = useState("")
  const [, startTransition] = useTransition()
  const itemNamesAndKeywords = useAppSelector(selectItemNamesAndKeywords)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const clickHandler = useCallback(() => {
    dispatch(searchResultsCleared())
    setInputValue("")
    inputRef.current?.focus()
  }, [dispatch])

  const changeValue = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const { value } = event.target

      setInputValue(value)

      startTransition(() => {
        const listItems = fallbackToEmptyArray(
          search(value, itemNamesAndKeywords),
        )

        const searchResultsIds = isEmptyArray(listItems)
          ? EMPTY_ARRAY
          : listItems.map<number>(({ id }) => id)

        if (isEmptyArray(searchResultsIds)) {
          dispatch(searchResultsCleared())
        }

        dispatch(searchResultsUpdated(searchResultsIds))
      })
    },
    [dispatch, itemNamesAndKeywords, startTransition],
  )

  const slotProps = useMemo(
    () =>
      ({
        input: {
          style,
          inputProps: {
            role: "search",
          },
          endAdornment: inputValue && (
            <InputEndAdornment onClick={clickHandler} />
          ),
        },
      }) as const satisfies TextFieldProps["slotProps"],
    [clickHandler, inputValue],
  )

  return (
    <TextField
      className="mt-4"
      id="text-field"
      fullWidth
      autoFocus
      slotProps={slotProps}
      inputRef={inputRef}
      label="Search"
      onChange={changeValue}
      value={inputValue}
      variant="outlined"
    />
  )
}

export default memo(InputFieldComponent)
