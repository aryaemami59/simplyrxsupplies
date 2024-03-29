import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Paper from "@mui/material/Paper";
import type { FC } from "react";
import { memo } from "react";

import VendorColumnList from "./components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./components/InputComponents/InputGroupComponent";
import SideBarContainer from "./components/SideBarComponents/SideBarContainer";
import TopNavbar from "./components/TopNavbarComponents/TopNavbar";
import ColorModeProvider from "./contexts/ColorModeProvider";
import { useGetMainQuery } from "./redux/apiSlice";
import ErrorComponent from "./shared/components/ErrorComponent";
import IsLoading from "./shared/components/IsLoading";

const App: FC = () => {
  const { isError, isLoading } = useGetMainQuery();

  if (isLoading) return <IsLoading />;

  if (isError) return <ErrorComponent />;

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
