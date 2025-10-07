import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import type { MouseEventHandler } from "react"
import { memo, useCallback } from "react"
import { itemAddedToCarts } from "../../redux/addedSlice.js"
import { useAppDispatch, useAppSelector } from "../../redux/hooks.js"
import { checkIfAddedToAllVendors } from "../../redux/selectors.js"

const startIcon = <AddIcon />

type Props = {
  readonly visibleListId: number
}

export const SearchResultsAddButton = memo(({ visibleListId }: Props) => {
  const dispatch = useAppDispatch()

  const ifAddedToAllVendors = useAppSelector(state =>
    checkIfAddedToAllVendors(state, visibleListId),
  )

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    dispatch(itemAddedToCarts({ itemId: visibleListId }))
  }, [dispatch, visibleListId])

  return (
    <Button
      className="fw-bold w-auto p-auto shadow-sm rounded-pill text-none"
      disabled={ifAddedToAllVendors}
      onClick={clickHandler}
      startIcon={startIcon}
      variant="contained"
    >
      Add
    </Button>
  )
})
