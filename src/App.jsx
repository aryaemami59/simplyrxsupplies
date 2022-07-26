import "./App.css";
import { Col, Row, Container } from "reactstrap";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import items from "./data/items.json";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";

export const AddedContext = createContext();

function App() {
  const [itemsAdded, setItemsAdded] = useState([]);

  // const [classes, setClasses] = useState(() => "");
  // const isInitialMount = useRef(() => true);
  const addItems = useCallback(ev => {
    return setItemsAdded(prev => [...prev, ev]);
  }, []);

  // function addItems(ev) {
  //   setItemsAdded(prev => [...prev, ev]);
  // }

  const itemNames = useMemo(() => items.map(({ name }) => name), []);

  // console.log("app render");

  // useEffect(() => {
  //   console.log(itemsAdded);
  // }, [itemsAdded]);

  // useEffect(() => {
  //   console.log("item names");
  // }, [itemNames]);
  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     setClasses("text-decoration-line-through");
  //     console.log(itemsAdded);
  //   }
  // }, [itemsAdded]);

  return (
    <div className="App">
      <NavbarComponent items={items} itemsAdded={itemsAdded} onAdd={addItems} />
      <Container>
        <Row className="my-5">
          <Col md="6">
            <AddedContext.Provider value={itemsAdded}>
              <InputGroupComponent
                onAdd={addItems}
                // itemsAdded={itemsAdded}
                // itemNames={itemNames}
                items={items}
                key={`InputGroupComponent`}
              />
            </AddedContext.Provider>
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
