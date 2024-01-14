import type { FC } from "react"
import { memo } from "react"

import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors"
import { useAppSelector } from "../../redux/hooks"
import SideBarAccordionCategories from "./SideBarAccordionCategories"

const SideBarAccordionList: FC = () => {
  const categoryIds = useAppSelector(
    ADAPTER_SELECTORS.GLOBAL.categories.selectIds,
  )

  return (
    <>
      {categoryIds.map(categoryId => (
        <SideBarAccordionCategories
          key={`${categoryId}-SideBarAccordion-SideBarAccordionList`}
          categoryId={categoryId}
        />
      ))}
    </>
  )
}

export default memo(SideBarAccordionList)
