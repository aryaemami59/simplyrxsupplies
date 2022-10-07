import { FC, memo, useContext } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { DarkMode } from "../../../App";
import VendorDropDownsList from "../DropDownComponents/VendorDropDownsList";
import SideBarAccordionList from "../SideBarComponents/SideBarAccordionList";

const OffcanvasBodyContent: FC = () => {
  const { darkTheme } = useContext(DarkMode);
  const border = darkTheme ? "border-info" : "border-dark";
  return (
    <>
      <Offcanvas.Title
        className="mb-4"
        key={`Offcanvas.Title-OffcanvasComponent-By Vendor`}>
        By Vendor
      </Offcanvas.Title>
      <Nav
        className={`mb-5 rounded border p-4 ${border}`}
        key={`Nav-OffcanvasComponent`}>
        <VendorDropDownsList key={`VendorDropDownsList-OffcanvasComponent`} />
      </Nav>
      <Offcanvas.Title
        className="mb-4"
        key={`Offcanvas.Title-OffcanvasComponent-By Category`}>
        By Category
      </Offcanvas.Title>
      <div
        key={`div-OffcanvasComponent`}
        className={`accordion rounded border ${border}`}>
        <SideBarAccordionList key={`SideBarAccordionList-OffcanvasComponent`} />
      </div>
    </>
  );
};

export default memo(OffcanvasBodyContent);
