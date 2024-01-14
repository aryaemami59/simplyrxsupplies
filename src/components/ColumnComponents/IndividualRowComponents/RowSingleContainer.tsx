import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Collapse from "@mui/material/Collapse"
import Fade from "@mui/material/Fade"
import type { FC } from "react"
import { memo, useCallback } from "react"

import useItemId from "../../../hooks/useItemId"
import useVendorId from "../../../hooks/useVendorId"
import { toggledMinimizeOneItemInCart } from "../../../redux/addedSlice"
import { useAppDispatch } from "../../../redux/hooks"
import { useIsMinimized, useItemName } from "../../../redux/selectors"
import CollapseButton from "./CollapseButton"
import RowSingleContainerModal from "./ModalComponents/RowSingleContainerModal"
import RowDeleteButton from "./RowDeleteButton"
import RowSingleItemInfo from "./RowSingleItemInfo"

const RowSingleContainer: FC = () => {
  const itemId = useItemId()
  const vendorId = useVendorId()
  const dispatch = useAppDispatch()
  const open = useIsMinimized(vendorId, itemId)
  const itemName = useItemName(itemId)
  const toggleFade = useCallback(() => {
    dispatch(toggledMinimizeOneItemInCart({ itemId, vendorId }))
  }, [dispatch, itemId, vendorId])

  return (
    <div className="rounded border mb-4">
      <div className="my-1 container-fluid">
        <div className="justify-content-evenly align-items-center row">
          <div className="col-xs-auto d-flex">
            <ButtonGroup
              className="flex-wrap justify-content-between"
              fullWidth
            >
              <RowSingleContainerModal />
              <CollapseButton isTooltipOpen={open} toggle={toggleFade} />
              <RowDeleteButton />
            </ButtonGroup>
          </div>
          <div className="col-12 col-xl-7 col-xxl-9">
            <Fade in={open} mountOnEnter unmountOnExit>
              <Button
                aria-controls="maximize content"
                className="w-100"
                onClick={toggleFade}
                variant="contained"
              >
                {itemName}
              </Button>
            </Fade>
          </div>
        </div>
      </div>
      <Collapse in={!open}>
        <div>
          <RowSingleItemInfo />
        </div>
      </Collapse>
    </div>
  )
}

export default memo(RowSingleContainer)
