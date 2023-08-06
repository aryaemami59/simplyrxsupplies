// import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Paper from "@mui/material/Paper";
import type { FC } from "react";
import { memo, useEffect } from "react";

import VendorColumnList from "./components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./components/InputComponents/InputGroupComponent";
import SideBarContainer from "./components/SideBarComponents/SideBarContainer";
import TopNavbar from "./components/TopNavbarComponents/TopNavbar";
import ColorModeProvider from "./contexts/ColorModeProvider";
import useIsLoading from "./hooks/useIsLoading";
import { fetchItems } from "./redux/addedSlice";
import { useAppDispatch } from "./redux/hooks";
import ErrorComponent from "./shared/components/ErrorComponent";
import IsLoading from "./shared/components/IsLoading";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchItems());
  }, [dispatch]);

  const [isLoading, errorMessage] = useIsLoading();

  if (isLoading) return <IsLoading />;

  if (errorMessage) return <ErrorComponent />;

  return (
    <ColorModeProvider>
      <Paper
        className="App"
        id="App">
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
