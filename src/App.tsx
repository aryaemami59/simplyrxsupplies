import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction, useEffect
} from "react";
import "./App.css";
import ErrorComponent from "./ErrorComponent";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import SideBarContainer from "./features/components/SideBarComponents/SideBarContainer";
import TopNavbar from "./features/components/TopNavbarComponents/TopNavbar";
import IsLoading from "./IsLoading";
import { fetchItems } from "./Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { checkIfLoading, selectErrMsg } from "./Redux/selectors";

export interface myContextInterface {
  darkTheme: boolean | (() => boolean);
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const DarkMode = createContext<myContextInterface>({
  darkTheme: true,
  setDarkTheme: () => {},
});

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
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
    <div className="App">
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
          <div className="col-11 col-md-6 col-lg-4 col-xl-5 my-5 justify-content-center px-5">
            <div className="d-none d-md-block">
              <VendorColumnList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(App);
