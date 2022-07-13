import "./App.css";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import { useState } from "react";
import VendorDropDownsList from "./features/components/VendorDropDownsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VendorAccordionList from "./features/components/VendorAccordionList";
import VendorColumnList from "./features/components/VendorColumnList";
import items from "./app/items.json";

function App() {
  const [show, setShow] = useState(false);
  const [itemsAdded, setItemsAdded] = useState([]);
  return (
    <div className="App">
      <div>
        <Navbar color="dark" dark expand="lg" sticky="top">
          <NavbarBrand href="/" className="me-3">
            Simply Supplies
          </NavbarBrand>
          <NavbarToggler
            onClick={() => setShow(!show)}
            className="me-2"></NavbarToggler>
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <VendorDropDownsList
                items={items}
                onAdd={ev => setItemsAdded([...itemsAdded, ev])}
              />
            </Nav>
          </Collapse>
          <Offcanvas
            direction="start"
            isOpen={show}
            toggle={() => setShow(!show)}>
            <OffcanvasHeader toggle={() => setShow(!show)}>
              Offcanvas
            </OffcanvasHeader>
            <OffcanvasBody>
              <strong>This is the Offcanvas body.</strong>
              <VendorAccordionList
                items={items}
                onAdd={ev => setItemsAdded([...itemsAdded, ev])}
              />
            </OffcanvasBody>
          </Offcanvas>
        </Navbar>
        <VendorColumnList itemsAdded={itemsAdded} />
      </div>
    </div>
  );
}

export default App;
