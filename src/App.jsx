import "./App.css";
import { Col, Row, Container } from "reactstrap";
import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import items from "./data/items.json";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";

function App() {
  const [itemsAdded, setItemsAdded] = useState(() => []);
  const [classes, setClasses] = useState(() => "");
  const isInitialMount = useRef(() => true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setClasses("text-decoration-line-through");
    }
  }, [itemsAdded]);

  return (
    <div className="App">
      <NavbarComponent
        classes={classes}
        items={items}
        itemsAdded={itemsAdded}
        onAdd={ev => setItemsAdded(prev => [...prev, ev])}
      />
      <Container>
        <Row className="my-5">
          <Col md="6">
            <InputGroupComponent items={items} key={`InputGroupComponent`} />
          </Col>
          <Col md="4">
            <VendorColumnList itemsAdded={itemsAdded} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
