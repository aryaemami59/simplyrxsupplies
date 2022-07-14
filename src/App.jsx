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
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import items from "./app/items.json";
import VendorDropDownsList from "./features/components/DropDownComponents/VendorDropDownsList";
import VendorAccordionList from "./features/components/AccordionComponents/VendorAccordionList";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";

function App() {
  const [show, setShow] = useState(false);
  const [itemsAdded, setItemsAdded] = useState([]);
  const [classes, setClasses] = useState("");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setClasses("text-decoration-line-through");
    }
  }, [itemsAdded]);

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
                classes={classes}
                items={items}
                itemsAdded={itemsAdded}
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
                classes={classes}
                itemsAdded={itemsAdded}
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
