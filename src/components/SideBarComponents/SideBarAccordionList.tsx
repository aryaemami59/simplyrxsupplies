import type { FC } from "react";
import { memo } from "react";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "../../redux/hooks";
import { selectCategoriesArray } from "../../redux/selectors";
import SideBarAccordionCategories from "./SideBarAccordionCategories";

const SideBarAccordionList: FC = () => {
  const categoryList = useAppSelector(selectCategoriesArray, shallowEqual);

  return (
    <>
      {categoryList.map(category => (
        <SideBarAccordionCategories
          key={`${category}-SideBarAccordion-SideBarAccordionList`}
          category={category}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
