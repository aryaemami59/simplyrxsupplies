import { FC, memo } from "react";
import { shallowEqual } from "react-redux";
import { selectCategoriesArr } from "../../../Redux/selectors";
import { useAppSelector } from "../../../Redux/hooks";
import SideBarAccordionCategories from "./SideBarAccordionCategories";

const SideBarAccordionList: FC = () => {
  const categoryList = useAppSelector(selectCategoriesArr, shallowEqual);

  return (
    <>
      {categoryList.map(category => (
        <SideBarAccordionCategories
          category={category}
          key={`${category}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
};

export default memo(SideBarAccordionList);
