import type { CardHeaderProps } from "@mui/material/CardHeader"
import CardHeader from "@mui/material/CardHeader"
import { useItemName } from "../../redux/selectors.js"

type Props = {
  readonly visibleListId: number
}

const slotProps = {
  title: {
    className: "fs-5",
  },
} as const satisfies CardHeaderProps["slotProps"]

export const SearchResultsItemName = ({ visibleListId }: Props) => {
  const itemName = useItemName(visibleListId)

  return (
    <CardHeader
      className="p-1 p-lg-auto"
      slotProps={slotProps}
      title={itemName}
    />
  )
}
