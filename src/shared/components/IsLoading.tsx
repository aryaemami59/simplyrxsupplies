import { Spinner } from "react-bootstrap"

/**
 * Displays a centered Bootstrap {@linkcode Spinner} to indicate that data is
 * being fetched or a page is being loaded. Intended for use as a `Suspense`
 * fallback or an RTK Query loading state placeholder.
 */
// export const IsLoading = () => (
//   <div className="d-flex justify-content-center">
//     <CircularProgress
//       size={300}
//       disableShrink
//       className="my-5 loading-spinner"
//     />
//   </div>
// );
export const IsLoading = () => (
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
