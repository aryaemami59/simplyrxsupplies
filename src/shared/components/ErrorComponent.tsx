import { Alert } from "react-bootstrap"

export const ErrorComponent = () => (
  <div className="justify-content-center d-flex mt-5 w-100">
    <Alert className="w-75" variant="danger">
      <Alert.Heading className="fs-1">Oh snap! You got an error!</Alert.Heading>
      <p className="fs-2">
        Looks like there was a problem loading the page. Either refresh the page
        or try again later.
      </p>
    </Alert>
  </div>
)
