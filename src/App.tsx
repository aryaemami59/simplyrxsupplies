import "@fortawesome/fontawesome-free/css/all.min.css";
import { Paper } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { FC, memo, useEffect } from "react";
import "./App.css";
import VendorColumnList from "./components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./components/InputComponents/InputGroupComponent";
import SideBarContainer from "./components/SideBarComponents/SideBarContainer";
import TopNavbar from "./components/TopNavbarComponents/TopNavbar";
import ColorModeProvider from "./contexts/ColorModeProvider";
import useIsLoading from "./hooks/useIsLoading";
import { fetchItems } from "./Redux/addedSlice";
import { useAppDispatch } from "./Redux/hooks";
import ErrorComponent from "./shared/components/ErrorComponent";
import IsLoading from "./shared/components/IsLoading";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const [isLoading, errMsg] = useIsLoading();

  if (isLoading) return <IsLoading />;

  if (errMsg) return <ErrorComponent />;

  return (
    <ColorModeProvider>
      <Paper className="App">
        <TopNavbar />
        <div className="container-fluid">
          <div className="justify-content-center row">
            <div className="col-lg-3 col-xl-2 px-0 d-none d-lg-block sidebar-col">
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
      </Paper>
    </ColorModeProvider>
  );
};

export default memo(App);
