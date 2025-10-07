import { memo } from "react"
import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors.js"
import { useAppSelector } from "../../redux/hooks.js"
import { SideBarAccordionCategories } from "./SideBarAccordionCategories.js"

export const SideBarAccordionList = memo(() => {
  const categoryIds = useAppSelector(
    ADAPTER_SELECTORS.GLOBAL.categories.selectIds,
  )

  return (
    <>
      {categoryIds.map(categoryId => (
        <SideBarAccordionCategories
          categoryId={categoryId}
          key={`${categoryId.toString()}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  )
})
