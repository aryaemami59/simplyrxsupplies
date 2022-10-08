import { FC, memo } from "react";
import SideBarAccordionList from "./SideBarAccordionList";

const SideBarContainer: FC = () => (
  <nav className="flex-column overflow-auto w-100 h-100 sticky-top c-overflow-x-hidden sidebar-col shadow">
    <div>
      <SideBarAccordionList />
    </div>
  </nav>
);

export default memo(SideBarContainer);
