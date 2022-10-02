import { FC, memo } from "react";
import { Spinner } from "react-bootstrap";

const IsLoading: FC = (): JSX.Element => {
  return (
    <div key={`div-isLoading-App`} className="d-flex justify-content-center">
      <Spinner
        animation="border"
        role="status"
        className="my-5"
        variant="info"
        style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default memo(IsLoading);
