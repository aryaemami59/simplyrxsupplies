import { FC, memo, useContext } from "react";
import { Nav } from "react-bootstrap";
import { DarkMode } from "../../../App";
import SideBarAccordionList from "./SideBarAccordionList";

const SideBarContainer: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const theme = darkTheme ? "custom-dark-mode" : "custom-light-mode";

  return (
    <nav
      className="flex-column overflow-auto w-100 h-100 sticky-top c-overflow-x-hidden sidebar-col"
      key={"SideBarContainer"}>
      <div
        key={`div-VerticalNavComponent`}
        // className="sidebar-col"
        // className={`d-none d-lg-block sticky-top ${theme}`}
      >
        <SideBarAccordionList key={"sidebar accordion list"} />
      </div>
    </nav>
  );
};

export default memo(SideBarContainer);
