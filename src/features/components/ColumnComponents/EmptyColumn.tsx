import { Alert, AlertTitle } from "@mui/material";
import { FC, memo } from "react";

const EmptyColumn: FC = () => (
  <Alert
    className="justify-content-center"
    severity="error">
    <AlertTitle>No Item Has Been Added Yet!</AlertTitle>
  </Alert>
);

export default memo(EmptyColumn);
