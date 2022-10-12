import "@fortawesome/fontawesome-free/css/all.min.css";
import { grey } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createContext,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
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

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    white: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    neutral: true;
    white: true;
  }
}

export interface myContextInterface {
  darkTheme: boolean | (() => boolean);
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<myContextInterface>({
  darkTheme: true,
  setDarkTheme: () => {},
});

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const defaultTheme = createTheme();

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const isLoading: boolean = useAppSelector(checkIfLoading);
  const errMsg: string = useAppSelector(selectErrMsg);

  const theme = useMemo(
    () =>
      createTheme({
        status: {
          danger: "#e53e3e",
        },

        palette: {
          neutral: {
            main: "#64748B",
            contrastText: "#fff",
          },
          white: {
            main: "#fff",
          },
          // white: defaultTheme.palette.augmentColor({
          //   color: { main: "#fff" },
          //   name: "white",
          // }),
          primary: {
            main: "#0071dc",
          },
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                // primary: amber,
                // divider: amber[200],

                background: {
                  default: "rgb(255, 255, 255)",
                  paper: "rgb(255, 255, 255)",
                },
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                // palette values for dark mode
                // primary: deepOrange,
                // divider: deepOrange[700],
                background: {
                  default: "rgb(21, 32, 43)",
                  paper: "rgb(21, 32, 43)",
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                },
              }),
        },
      }),
    [mode]
  );

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
