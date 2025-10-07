import { memo } from "react"
import { SideBarAccordionList } from "./SideBarAccordionList.js"

export const SideBarContainer = memo(() => (
  <nav className="flex-column overflow-auto sticky-top c-overflow-x-hidden shadow sidebar-container">
    <div>
      <SideBarAccordionList />
    </div>
  </nav>
))
