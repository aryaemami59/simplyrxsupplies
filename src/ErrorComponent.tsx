import { FC, memo } from "react";
import { Alert } from "react-bootstrap";

const ErrorComponent: FC = (): JSX.Element => {
  return (
    <>
      <div
        key={`div-errMsg-App`}
        className="justify-content-center d-flex mt-5 w-100">
        <Alert
          key={`Alert-errMsg-App`}
          variant="danger"
          className="w-75">
          <Alert.Heading
            key={`Alert.Heading-errMsg-App`}
            className="fs-1">
            Oh snap! You got an error!
          </Alert.Heading>
          <p
            className="fs-2"
            key={`p-errMsg-App`}>
            Looks like there was a problem loading the page. Either refresh the
            page or try again later.
          </p>
        </Alert>
      </div>
    </>
  );
};

export default memo(ErrorComponent);
