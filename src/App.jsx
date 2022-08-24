import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createContext, memo, useEffect, useState, } from "react";
import { checkIfLoading, fetchItems, fetchNavList, fetchVendors, selectErrMsg, } from "./addedSlice";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";
import VerticalNavComponent from "./features/components/SideBarNavComponents/VerticalNavComponent";
// export const DarkMode = createContext({
//   darkTheme: true,
//   setDarkTheme,
// });
export const DarkMode = createContext(null);
// export const setDarkMode = createContext();
const getLocalStorageTheme = () => !!localStorage.getItem("theme");
function App() {
    // const [darkTheme, setDarkTheme] = useState(true);
    const [darkTheme, setDarkTheme] = useState(() => getLocalStorageTheme());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchVendors());
        dispatch(fetchNavList());
    }, [dispatch]);
    const isLoading = useSelector(checkIfLoading);
    const errMsg = useSelector(selectErrMsg);
    if (isLoading) {
        return (<div key={`div-isLoading-App`} className="d-flex justify-content-center">
        <Spinner animation="border" role="status" className="my-5" variant="info" style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>);
    }
    if (errMsg) {
        return (<div key={`div-errMsg-App`} className="justify-content-center d-flex mt-5 w-100">
        <Alert key={`Alert-errMsg-App`} variant="danger" className="w-75">
          <Alert.Heading key={`Alert.Heading-errMsg-App`} className="fs-1">
            Oh snap! You got an error!
          </Alert.Heading>
          <p className="fs-2" key={`p-errMsg-App`}>
            Looks like there was a problem loading the page. Either refresh the
            page or try again later.
          </p>
        </Alert>
      </div>);
    }
    return (<div className={`App ${darkTheme ? "custom-dark-mode" : "custom-light-mode"}`}>
      <DarkMode.Provider value={{ darkTheme, setDarkTheme }}>
        <NavbarComponent key={`NavbarComponent-App`}/>
        <Container fluid key={`Container-App`} className="">
          <Row className="justify-content-center" key={`Row-App`}>
            <Col key={`Col-firstCol-App`} xs={0} lg={3} xl={2} className="ps-0 pe-0 d-none d-lg-block" style={{
            height: "calc(100vh - 54px)",
            position: "sticky",
            top: "54px",
        }}>
              <VerticalNavComponent key={`VerticalNavComponent-App`}/>
            </Col>
            <Col xs={11} sm={11} md={6} lg={5} xl={5} xxl={5} className="mt-5" key={`Col-secondCol-App`}>
              <InputGroupComponent key={`InputGroupComponent-App`}/>
            </Col>
            <Col key={`Col-thirdCol-App`} xs={11} sm={11} md={6} lg={4} xl={5} xxl={5} className="my-5 justify-content-center">
              <VendorColumnList key={`VendorColumnList-App`}/>
            </Col>
          </Row>
        </Container>
      </DarkMode.Provider>
    </div>);
}
export default memo(App);
