import "./App.css";
import { Col, Row, Container } from "reactstrap";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  memo,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";
import AddedContext from "./features/components/ContextComponents/AddedContext";
const myURL =
  "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const myItems = fetch(myURL, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3.raw",
        Authorization: "Bearer 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",
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      .then(e => setItems(e));
  }, []);

  console.log("app render");

  return (
    <div className="App">
      <AddedContext>
        <NavbarComponent items={items} />
        <Container>
          <Row className="my-5">
            <Col md="6">
              <InputGroupComponent items={items} key={`InputGroupComponent`} />
            </Col>
            <Col md="4">
              <VendorColumnList />
            </Col>
          </Row>
        </Container>
      </AddedContext>
    </div>
  );
}

export default memo(App);
