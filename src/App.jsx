import React from "react";
import "./App.css";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
} from "reactstrap";
import { useState } from "react";
import MckessonDropDown from "./features/components/MckessonDropDown";
import VendorDropDownsList from "./features/components/VendorDropDownsList";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <div>
        <Navbar color="dark" dark expand="lg" sticky="top">
          <NavbarBrand href="/" className="me-3">
            navbar brand
          </NavbarBrand>
          <NavbarToggler
            onClick={() => setShow(!show)}
            className="me-2"></NavbarToggler>
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              {/* <NavItem>
                <NavLink href="/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">GitHub</NavLink>
              </NavItem> */}
              {/* <MckessonDropDown /> */}
              <VendorDropDownsList></VendorDropDownsList>
              {/* <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  McKesson
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>10 Dram Vials</DropdownItem>
                  <DropdownItem>13 Dram Vials</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
          <Offcanvas
            direction="start"
            toggle={() => setShow(!show)}
            isOpen={show}>
            <OffcanvasHeader toggle={() => setShow(!show)}>
              Offcanvas
            </OffcanvasHeader>
            <OffcanvasBody>
              <strong>This is the Offcanvas body.</strong>
              <VendorDropDownsList />
            </OffcanvasBody>
          </Offcanvas>
        </Navbar>
      </div>
    </div>
  );
}

export default App;
