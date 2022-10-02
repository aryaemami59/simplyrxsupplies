import { FC, memo, useContext } from "react";
import { Nav } from "react-bootstrap";
import { DarkMode } from "../../../App";
import SideBarAccordionList from "./SideBarAccordionList";

const SideBarContainer: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);
  const theme = darkTheme ? "custom-dark-mode" : "custom-light-mode";

  return (
    <Nav
      className="flex-column overflow-auto w-100 h-100 sticky-top c-overflow-x-hidden"
      key={"SideBarContainer"}>
      <div
        key={`div-VerticalNavComponent`}
        className={`accordion d-none d-lg-block sticky-top ${theme}`}>
        <SideBarAccordionList key={"sidebar accordion list"} />
      </div>
    </Nav>
  );
};

export default memo(SideBarContainer);
