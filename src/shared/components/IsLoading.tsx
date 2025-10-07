import { memo } from "react"
import { Spinner } from "react-bootstrap"

// const IsLoading = () => (
//   <div className="d-flex justify-content-center">
//     <CircularProgress
//       size={300}
//       disableShrink
//       className="my-5 loading-spinner"
//     />
//   </div>
// );
const IsLoading = () => (
  <div className="d-flex justify-content-center">
    <Spinner
      animation="border"
      className="my-5 loading-spinner"
      // role="status"
      variant="info"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)

export default memo(IsLoading)
