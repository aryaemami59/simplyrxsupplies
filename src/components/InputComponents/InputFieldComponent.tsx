import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"
import type { ChangeEventHandler, MouseEventHandler } from "react"
import {
  useCallback,
  useEffect,
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
import type { AnyFunction } from "../../types/tsHelpers.js"
import { EMPTY_ARRAY } from "../../utils/emptyArray.js"
import { fallbackToEmptyArray } from "../../utils/fallbackToEmptyArray.js"
import { isEmptyArray } from "../../utils/predicates/isEmptyArray.js"
import { search } from "../../utils/search/search.js"
import { InputEndAdornment } from "./InputEndAdornment.js"

const style = {
  backgroundColor: SEARCH_FIELD_BG,
  borderRadius: "30px",
} as const satisfies NonNullable<
  Exclude<NonNullable<TextFieldProps["slotProps"]>["input"], AnyFunction>
>["style"]

const htmlInput = {
  role: "search",
} as const satisfies NonNullable<
  Exclude<NonNullable<TextFieldProps["slotProps"]>["htmlInput"], AnyFunction>
>

export const InputFieldComponent = () => {
  const dispatch = useAppDispatch()

  const [inputValue, setInputValue] = useState("")

  const [, startTransition] = useTransition()

  const itemNamesAndKeywords = useAppSelector(selectItemNamesAndKeywords)

  const inputRef = useRef<HTMLInputElement>(null)

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
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
        htmlInput,
        input: {
          endAdornment: inputValue ? (
            <InputEndAdornment onClick={clickHandler} />
          ) : null,
          style,
        },
      }) as const satisfies TextFieldProps["slotProps"],
    [clickHandler, inputValue],
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <TextField
      // autoFocus
      className="mt-4"
      fullWidth
      id="search-field"
      inputRef={inputRef}
      label="Search"
      onChange={changeValue}
      slotProps={slotProps}
      value={inputValue}
    />
  )
}
