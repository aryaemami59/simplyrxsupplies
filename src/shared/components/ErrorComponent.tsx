import type { FC } from "react";
import { memo } from "react";
import { Alert } from "react-bootstrap";

const ErrorComponent: FC = () => (
  <div
    key="div-errMsg-App"
    className="justify-content-center d-flex mt-5 w-100">
    <Alert
      key="Alert-errMsg-App"
      className="w-75"
      variant="danger">
      <Alert.Heading
        key="Alert.Heading-errMsg-App"
        className="fs-1">
        Oh snap! You got an error!
      </Alert.Heading>
      <p
        key="p-errMsg-App"
        className="fs-2">
        Looks like there was a problem loading the page. Either refresh the page
        or try again later.
      </p>
    </Alert>
  </div>
);

export default memo(ErrorComponent);
