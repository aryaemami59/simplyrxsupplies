import { FC, memo } from "react";
import { Spinner } from "react-bootstrap";

const IsLoading: FC = () => (
  <div
    key="div-isLoading-App"
    className="d-flex justify-content-center">
    <Spinner
      animation="border"
      role="status"
      className="my-5 loading-spinner"
      variant="info">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

export default memo(IsLoading);
