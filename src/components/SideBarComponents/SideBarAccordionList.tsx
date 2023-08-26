import type { FC } from "react";
import { memo } from "react";

import { useAppSelector } from "../../redux/hooks";
import { globalizedSelectors } from "../../redux/selectors";
import SideBarAccordionCategories from "./SideBarAccordionCategories";

const SideBarAccordionList: FC = () => {
  const categoryIds = useAppSelector(globalizedSelectors.categories.selectIds);

  return (
    <>
      {categoryIds.map(categoryId => (
        <SideBarAccordionCategories
          key={`${categoryId}-SideBarAccordion-SideBarAccordionList`}
          categoryId={categoryId}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
