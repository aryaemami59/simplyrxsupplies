import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  // useState,
} from "react";
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

// const getLocalStorageTheme = (): boolean =>
//   localStorage.getItem("theme") ? !!localStorage.getItem("theme") : true;

const App: FC = () => {
  // const [darkTheme, setDarkTheme] = useState<boolean>(getLocalStorageTheme);
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
      className="App"
      // className={`App ${darkTheme ? "custom-dark-mode" : "custom-light-mode"}`}
    >
      {/* <DarkMode.Provider value={{ darkTheme, setDarkTheme }}> */}
      <TopNavbar />
      <div className="container-fluid">
        <div className="justify-content-center row">
          <div
            className="col-lg-3 col-xl-2 px-0 d-none d-lg-block sticky-top sidebar-col"
            style={{ marginTop: 37 }}>
            <SideBarContainer />
          </div>
          <div className="col-11 col-md-6 col-lg-5 mt-5">
            <InputGroupComponent />
          </div>
          <div className="col-11 col-md-6 col-lg-4 col-xl-5 my-5 justify-content-center">
            <span className="d-none d-md-inline-block">
              <VendorColumnList />
            </span>
          </div>
        </div>
      </div>
      {/* </DarkMode.Provider> */}
    </div>
  );
};

export default memo(App);
