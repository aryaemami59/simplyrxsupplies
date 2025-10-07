import type { FC } from "react"
import { memo } from "react"
import SideBarAccordionList from "./SideBarAccordionList.js"

const SideBarContainer: FC = () => (
  <nav className="flex-column overflow-auto sticky-top c-overflow-x-hidden shadow sidebar-container">
    <div>
      <SideBarAccordionList />
    </div>
  </nav>
)

export default memo(SideBarContainer)
