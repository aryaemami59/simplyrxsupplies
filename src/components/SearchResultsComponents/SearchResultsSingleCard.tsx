import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { memo } from "react"
import SearchResultsCardBodyContent from "./SearchResultsCardBodyContent.js"

type Props = {
  readonly visibleListId: number
}

const SearchResultsSingleCard = ({ visibleListId }: Props) => (
  <Card className="shadow" variant="outlined">
    <CardContent className="row gy- justify-content-center p-2">
      <SearchResultsCardBodyContent visibleListId={visibleListId} />
    </CardContent>
  </Card>
)

export default memo(SearchResultsSingleCard)
