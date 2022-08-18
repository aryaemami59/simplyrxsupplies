import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { memo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";
import VerticalNavComponent from "./features/components/SideBarNavComponents/VerticalNavComponent";
// import { useQuery } from "react-query";
// import { Alert } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItems, fetchNavList, fetchVendors } from "./addedSlice";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

// const fetchItems = async () => {
//   const response = await fetch(GITHUB_URL, {
//     method: "GET",
//     headers: {
//       Accept: "application/vnd.github.v3.raw.json",
//       Authorization: "Bearer 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",
//     },
//   });
//   const jsonItems = await response.json();
//   const myItems = await jsonItems.items;
//   return myItems;
// };

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchNavList());
  }, [dispatch]);
  const isLoading = useSelector(
    state =>
      state.item.isLoading ||
      state.added.vendorsIsLoading ||
      state.added.navListIsLoading
  );
  const errMsg = useSelector(state => state.item.errMsg || state.added.errMsg);

  // const { isLoading, error, data, status } = useQuery(["items"], fetchItems);

  if (isLoading) {
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
  }

  // if (error) {
  //   return (
  //     <div className="justify-content-center d-flex mt-5 w-100">
  //       <Alert variant="danger" className="w-75">
  //         <Alert.Heading className="fs-1">
  //           Oh snap! You got an error!
  //         </Alert.Heading>
  //         <p className="fs-2">
  //           Looks like there was a problem loading the page. Either refresh the
  //           page or try again later.
  //         </p>
  //       </Alert>
  //     </div>
  //   );
  // }

  if (errMsg) {
    return (
      <div
        key={`div-errMsg-App`}
        className="justify-content-center d-flex mt-5 w-100">
        <Alert key={`Alert-errMsg-App`} variant="danger" className="w-75">
          <Alert.Heading key={`Alert.Heading-errMsg-App`} className="fs-1">
            Oh snap! You got an error!
          </Alert.Heading>
          <p className="fs-2" key={`p-errMsg-App`}>
            Looks like there was a problem loading the page. Either refresh the
            page or try again later.
          </p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="App">
      <NavbarComponent key={`NavbarComponent-App`} />
      <Container fluid key={`Container-App`}>
        <Row className="justify-content-center" key={`Row-App`}>
          <Col
            key={`Col-firstCol-App`}
            xs={0}
            lg={2}
            xl={2}
            className="ps-0 pe-0 d-none d-lg-block"
            style={{
              height: "calc(100vh - 54px)",
              position: "sticky",
              top: "54px",
            }}>
            <VerticalNavComponent key={`VerticalNavComponent-App`} />
          </Col>
          <Col
            xs={10}
            sm={11}
            md={6}
            lg={5}
            xl={5}
            xxl={4}
            className="mt-5"
            key={`Col-secondCol-App`}>
            <InputGroupComponent key={`InputGroupComponent-App`} />
          </Col>
          <Col
            key={`Col-thirdCol-App`}
            xs={10}
            sm={11}
            md={5}
            lg={5}
            xl={5}
            xxl={6}
            className="my-5 pe-5">
            <VendorColumnList key={`VendorColumnList-App`} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default memo(App);
