import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
