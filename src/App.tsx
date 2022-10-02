import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  createContext,
  memo,
  useEffect,
  useState,
  FC,
  SetStateAction,
  Dispatch,
} from "react";
import {
  checkIfLoading,
  fetchItems,
  fetchNavList,
  fetchVendors,
  selectErrMsg,
} from "./Redux/addedSlice";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import TopNavbar from "./features/components/TopNavbarComponents/TopNavbar";
import SideBarContainer from "./features/components/SideBarComponents/SideBarContainer";
import { useAppSelector, useAppDispatch } from "./Redux/hooks";
import IsLoading from "./IsLoading";
import ErrorComponent from "./ErrorComponent";

export interface myContextInterface {
  darkTheme: boolean | (() => boolean);
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const DarkMode = createContext<myContextInterface>({
  darkTheme: true,
  setDarkTheme: () => {},
});

const getLocalStorageTheme = (): boolean =>
  localStorage.getItem("theme") ? !!localStorage.getItem("theme") : true;

const App: FC = (): JSX.Element => {
  const [darkTheme, setDarkTheme] = useState<boolean>(() =>
    getLocalStorageTheme()
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchNavList());
  }, [dispatch]);

  const isLoading: boolean = useAppSelector(checkIfLoading);
  const errMsg: string = useAppSelector(selectErrMsg);

  if (isLoading) {
    return <IsLoading />;
  }

  if (errMsg) {
    return <ErrorComponent />;
  }

  return (
    <div
      className={`App ${darkTheme ? "custom-dark-mode" : "custom-light-mode"}`}>
      <DarkMode.Provider value={{ darkTheme, setDarkTheme }}>
        <TopNavbar key={`NavbarComponent-App`} />
        <Container fluid key={`Container-App`}>
          <Row className="justify-content-center" key={`Row-App`}>
            <Col
              key={`Col-firstCol-App`}
              xs={0}
              lg={3}
              xl={2}
              className="ps-0 pe-0 d-none d-lg-block sidebar-col position-sticky">
              <SideBarContainer key={`VerticalNavComponent-App`} />
            </Col>
            <Col
              xs={11}
              sm={11}
              md={6}
              lg={5}
              xl={5}
              xxl={5}
              className="mt-5"
              key={`Col-secondCol-App`}>
              <InputGroupComponent key={`InputGroupComponent-App`} />
            </Col>
            <Col
              key={`Col-thirdCol-App`}
              xs={11}
              sm={11}
              md={6}
              lg={4}
              xl={5}
              xxl={5}
              className="my-5 justify-content-center">
              <VendorColumnList key={`VendorColumnList-App`} />
            </Col>
          </Row>
        </Container>
      </DarkMode.Provider>
    </div>
  );
};

export default memo(App);
