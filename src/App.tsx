import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, FC, memo, useEffect, useMemo, useState } from "react";
import "./App.css";
import ErrorComponent from "./ErrorComponent";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import SideBarContainer from "./features/components/SideBarComponents/SideBarContainer";
import TopNavbar from "./features/components/TopNavbarComponents/TopNavbar";
import { darkTheme, lightTheme } from "./features/shared/themes";
import IsLoading from "./IsLoading";
import { fetchItems } from "./Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { checkIfLoading, selectErrMsg } from "./Redux/selectors";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setDarkMode(prev => !prev);
      },
    }),
    []
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const isLoading: boolean = useAppSelector(checkIfLoading);
  const errMsg: string = useAppSelector(selectErrMsg);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  if (isLoading) {
    return <IsLoading />;
  }

  if (errMsg) {
    return <ErrorComponent />;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div
          className="App"
          style={{ backgroundColor: theme.palette.background.paper }}>
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default memo(App);
