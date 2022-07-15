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
  Col,
  Row,
  Container,
} from "reactstrap";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import items from "./data/items.json";
import VendorDropDownsList from "./features/components/DropDownComponents/VendorDropDownsList";
import VendorAccordionList from "./features/components/AccordionComponents/VendorAccordionList";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";

function App() {
  const [show, setShow] = useState(false);
  const [itemsAdded, setItemsAdded] = useState([]);
  const [classes, setClasses] = useState("");
  // const [added, setAdded] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // setAdded(true);
      setClasses("text-decoration-line-through");
    }
    // isInitialMount.current
    //   ? (isInitialMount.current = false)
    //   : setClasses("text-decoration-line-through");
    // setAdded(true);
    // console.log(added);
  }, [itemsAdded]);
  // console.log(added);

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
                // added={added}
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
                // added={added}
                items={items}
                onAdd={ev => setItemsAdded([...itemsAdded, ev])}
              />
            </OffcanvasBody>
          </Offcanvas>
        </Navbar>
        <Container>
          <Row className="my-5">
            <Col md="6">
              <InputGroupComponent />
            </Col>
            <Col md="4">
              <VendorColumnList itemsAdded={itemsAdded} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
