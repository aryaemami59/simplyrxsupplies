import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import { memo } from "react"

export const EmptyColumn = memo(() => (
  <Alert className="justify-content-center" severity="error">
    <AlertTitle>No Item Has Been Added Yet!</AlertTitle>
  </Alert>
))
