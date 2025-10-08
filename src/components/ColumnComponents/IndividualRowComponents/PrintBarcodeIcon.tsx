import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import IconButton from "@mui/material/IconButton"
import printJS from "print-js"
import type { MouseEventHandler } from "react"
import { useCallback } from "react"
import { useItemId } from "../../../hooks/useItemId.js"
import { useItemSrc } from "../../../redux/selectors.js"
import { Tooltip } from "../../../shared/components/Tooltip.js"

type Props = {
  readonly header: string
}

const startIcon = <FontAwesomeIcon icon={faPrint} />

const title = "Print Barcode"

export const PrintBarcodeIcon = ({ header }: Props) => {
  const itemId = useItemId()

  const src = useItemSrc(itemId)

  const clickHandler = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    printJS({
      printable: src,
      type: "image",
      header,
      imageStyle: "width:80%;margin-bottom:20px;",
    })
  }, [header, src])

  return (
    <Tooltip title={title}>
      <IconButton
        className="d-inline-block w-auto"
        onClick={clickHandler}
        size="small"
      >
        {startIcon}
      </IconButton>
    </Tooltip>
  )
}
