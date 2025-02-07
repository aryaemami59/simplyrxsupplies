import type { CardHeaderProps } from "@mui/material/CardHeader"
import CardHeader from "@mui/material/CardHeader"
import type { FC } from "react"
import { memo } from "react"

import { useItemName } from "../../redux/selectors"

type Props = {
  visibleListId: number
}

const slotProps = {
  title: {
    className: "fs-5",
  },
} as const satisfies CardHeaderProps["slotProps"]

const SearchResultsItemName: FC<Props> = ({ visibleListId }) => {
  const itemName = useItemName(visibleListId)

  return (
    <CardHeader
      className="p-1 p-lg-auto"
      title={itemName}
      slotProps={slotProps}
    />
  )
}

export default memo<Props>(SearchResultsItemName)
