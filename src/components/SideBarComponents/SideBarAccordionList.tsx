import type { FC } from "react"
import { memo } from "react"
import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors.js"
import { useAppSelector } from "../../redux/hooks.js"
import SideBarAccordionCategories from "./SideBarAccordionCategories.js"

const SideBarAccordionList: FC = () => {
  const categoryIds = useAppSelector(
    ADAPTER_SELECTORS.GLOBAL.categories.selectIds,
  )

  return (
    <>
      {categoryIds.map(categoryId => (
        <SideBarAccordionCategories
          key={`${categoryId.toString()}-SideBarAccordion-SideBarAccordionList`}
          categoryId={categoryId}
        />
      ))}
    </>
  )
}

export default memo(SideBarAccordionList)
