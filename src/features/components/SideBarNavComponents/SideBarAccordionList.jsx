import { memo } from "react";
import SideBarAccordion from "./SideBarAccordion";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectNavsArr } from "../../../addedSlice";
import { shallowEqual } from "react-redux";

function SideBarAccordionList() {
  const navList = useSelector(selectNavsArr, shallowEqual);

  return (
    <>
      {navList.map(e => (
        <SideBarAccordion category={e} key={`${e}-side-bar-accordion`} />
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
