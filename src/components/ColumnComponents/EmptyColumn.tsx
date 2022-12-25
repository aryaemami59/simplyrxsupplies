import { Alert, AlertTitle } from "@mui/material";
import type { FC } from "react";
import { memo } from "react";

const EmptyColumn: FC = () => (
  <Alert
    className="justify-content-center"
    severity="error">
    <AlertTitle>No Item Has Been Added Yet!</AlertTitle>
  </Alert>
);

export default memo(EmptyColumn);
