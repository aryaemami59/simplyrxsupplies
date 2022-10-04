import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import ErrorComponent from "./ErrorComponent";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import SideBarContainer from "./features/components/SideBarComponents/SideBarContainer";
import TopNavbar from "./features/components/TopNavbarComponents/TopNavbar";
import IsLoading from "./IsLoading";
import {
  checkIfLoading,
  fetchCategories,
  fetchItems,
  fetchVendors,
  selectErrMsg,
} from "./Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";

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
  const [darkTheme, setDarkTheme] = useState<boolean>(getLocalStorageTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchVendors());
    dispatch(fetchCategories());
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
        <div
          className="container-fluid"
          key={`Container-App`}>
          <div
            className="justify-content-center row"
            key={`Row-App`}>
            <div
              key={`Col-firstCol-App`}
              // xs={0}
              // lg={3}
              // xl={2}
              className="col-lg-3 col-xl-2 px-0 d-none d-lg-block sticky-top sidebar-col"
              style={{ marginTop: 37 }}>
              <SideBarContainer key={`VerticalNavComponent-App`} />
            </div>
            <div
              // xs={11}
              // sm={11}
              // md={6}
              // lg={5}
              // xl={5}
              // xxl={5}
              className="col-11 col-md-6 col-lg-5 mt-5"
              key={`Col-secondCol-App`}>
              <InputGroupComponent key={`InputGroupComponent-App`} />
            </div>
            <div
              key={`Col-thirdCol-App`}
              // xs={11}
              // sm={11}
              // md={6}
              // lg={4}
              // xl={5}
              // xxl={5}
              className="col-11 col-md-6 col-lg-4 col-xl-5 my-5 justify-content-center">
              <VendorColumnList key={`VendorColumnList-App`} />
            </div>
          </div>
        </div>
      </DarkMode.Provider>
    </div>
  );
};

export default memo(App);
