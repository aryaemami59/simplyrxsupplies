import { Nav } from "react-bootstrap";
import { memo, useContext, FC } from "react";
import SideBarAccordionList from "./SideBarAccordionList";
import { DarkMode } from "../../../App";

const SideBarContainer: FC = (): JSX.Element => {
  const { darkTheme } = useContext(DarkMode);

  return (
    <Nav
      className="flex-column overflow-auto w-100 h-100 sticky-top c-overflow-x-hidden"
      key={"sidebar nav component"}>
      <div
        key={`div-VerticalNavComponent`}
        className={`accordion d-none d-lg-block sticky-top ${
          darkTheme ? "custom-dark-mode" : "custom-light-mode"
        }`}>
        <SideBarAccordionList key={"sidebar accordion list"} />
      </div>
    </Nav>
  );
};

export default memo(SideBarContainer);
