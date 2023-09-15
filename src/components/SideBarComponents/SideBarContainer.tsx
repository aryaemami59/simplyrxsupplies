import type { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { FC } from "react";
import { memo } from "react";

import SideBarAccordionList from "./SideBarAccordionList";

const SideBarContainer: FC = () => {
  const matches = useMediaQuery<Theme>(theme => theme.breakpoints.up("lg"));

  return (
    matches && (
      <nav className="flex-column overflow-auto sticky-top c-overflow-x-hidden shadow sidebar-container">
        <div>
          <SideBarAccordionList />
        </div>
      </nav>
    )
  );
};

export default memo(SideBarContainer);
