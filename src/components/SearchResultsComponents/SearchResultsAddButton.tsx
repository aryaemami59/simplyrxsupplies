import AddIcon from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import type { MouseEventHandler } from "react"
import { useCallback } from "react"
import { itemAddedToCarts } from "../../redux/addedSlice.js"
import { useAppDispatch } from "../../redux/hooks.js"
import { useCheckIfAddedToAllVendors } from "../../redux/selectors.js"

const startIcon = <AddIcon />

type Props = {
  readonly visibleListId: number
}

export const SearchResultsAddButton = ({ visibleListId }: Props) => {
  const dispatch = useAppDispatch()

  const ifAddedToAllVendors = useCheckIfAddedToAllVendors(visibleListId)

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
}
