import Paper from "@mui/material/Paper"
import "bootstrap/dist/css/bootstrap.min.css"
import type { FC } from "react"
import { memo } from "react"
import "./App.css"
import VendorColumnList from "./components/ColumnComponents/VendorColumnList"
import InputGroupComponent from "./components/InputComponents/InputGroupComponent"
import SideBarContainer from "./components/SideBarComponents/SideBarContainer"
import TopNavbar from "./components/TopNavbarComponents/TopNavbar"
import ColorModeProvider from "./contexts/ColorModeProvider"
import { useGetMainQuery } from "./redux/apiSlice"
import ErrorComponent from "./shared/components/ErrorComponent"
import IsLoading from "./shared/components/IsLoading"

const App: FC = () => {
  const { isError, isLoading } = useGetMainQuery(undefined)

  if (isLoading) return <IsLoading />

  if (isError) return <ErrorComponent />

  return (
    <ColorModeProvider>
      <Paper className="App" id="App">
        <TopNavbar />
        <div className="container-fluid">
          <div className="justify-content-center row">
            {/* <Column start="lg"> */}
            <div className="col-lg-3 col-xl-2 px-0 d-none d-lg-block sidebar-col">
              <SideBarContainer />
            </div>
            {/* </Column> */}
            {/* <div className="col-lg-3 col-xl-2 px-0 d-xs-none d-sm-none d-lg-block sidebar-col">
            </div> */}
            <div className="col-11 col-md-6 col-lg-5 mt-5">
              <InputGroupComponent />
            </div>
            <div className="col-11 col-md-6 col-lg-4 col-xl-5 my-5 justify-content-center px-5">
              {/* <Column start="md"> */}
              <div className="d-none d-md-block">
                <VendorColumnList />
              </div>
              {/* </Column> */}
              {/* <div className="d-none d-md-block">
              </div> */}
            </div>
          </div>
        </div>
      </Paper>
    </ColorModeProvider>
  )
}

export default memo(App)
