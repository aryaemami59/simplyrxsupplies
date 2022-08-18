import { useSelector, shallowEqual } from "react-redux";
import { memo } from "react";
import { selectNavsArr } from "../../../addedSlice";
import SideBarAccordion from "./SideBarAccordion";
import PropTypes from "prop-types";

function SideBarAccordionList() {
  const navList = useSelector(selectNavsArr, shallowEqual);

  return (
    <>
      {navList.map(e => (
        <SideBarAccordion
          category={e}
          key={`${e}-SideBarAccordion-SideBarAccordionList`}
        />
      ))}
    </>
  );
}

SideBarAccordionList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
      keywords: PropTypes.arrayOf(PropTypes.string),
      nav: PropTypes.arrayOf(PropTypes.string),
      vendors: PropTypes.arrayOf(PropTypes.string),
      src: PropTypes.string,
    })
  ),
};

export default memo(SideBarAccordionList);
