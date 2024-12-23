import type { CardHeaderProps } from "@mui/material/CardHeader"
import CardHeader from "@mui/material/CardHeader"
import type { FC } from "react"
import { memo } from "react"

import { useItemName } from "../../redux/selectors"

type Props = {
  visibleListId: number
}

const titleTypographyProps: CardHeaderProps["titleTypographyProps"] = {
  className: "fs-5",
}

const SearchResultsItemName: FC<Props> = ({ visibleListId }) => {
  const itemName = useItemName(visibleListId)

  return (
    <CardHeader
      className="p-1 p-lg-auto"
      title={itemName}
      titleTypographyProps={titleTypographyProps}
    />
  )
}

export default memo<Props>(SearchResultsItemName)
