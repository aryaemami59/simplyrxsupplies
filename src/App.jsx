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
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import AddedContext from "./features/components/ContextComponents/AddedContext";
import jsbarcode from "jsbarcode";
// const queryClient = new QueryClient();
const myURL =
  "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";
async function myItems() {
  const abortCont = new AbortController();

  const response = await fetch(myURL, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3.raw",
      Authorization: "Bearer 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",
    },
    signal: abortCont.signal,
  });
  const jsonItems = await response.json();
  const final = await jsonItems.items;
  // .then(res => res.json())
  // .then(data => data.items);

  // console.log(final);
  // return final;
}

const fetchItems = async () => {
  // const abortCont = new AbortController();

  const response = await fetch(
    "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json",
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3.raw",
        Authorization: "Bearer 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",
      },
      // signal: abortCont.signal,
    }
  );
  return response.json();
  // .then(res => res.json())
  // .then(data => data.items);
  // const jsonItems = await response.json();
  // const final = await jsonItems.then(e => e.items);
  // return final;
};

// const mine = myItems();
// console.log(myItems());

function App() {
  const [items, setItems] = useState([]);
  items.forEach(e => {
    const elem = document.createElement("img");
    jsbarcode(elem, e.itemNumber);
    const mysrc = elem.getAttribute("src");
    e.src = mysrc;
  });
  // console.log(items);
  // const { isLoading, error, data, status } = useQuery("items", () =>
  //   fetchItems()
  // );
  // console.log(items);
  // console.log(status);
  // console.log(error);

  // useEffect(() => {
  //   status === "success" && console.log(data);
  //   status === "success" && setItems(data);
  // }, []);
  // useEffect(() => {
  //   mine.then(e => setItems(e));
  // }, []);
  // const [items, setItems] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(myURL, {
      signal: abortCont.signal,
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3.raw",
        Authorization: "Bearer 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",
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      .then(e => setItems(e));

    // return () => abortCont.abort();
  }, []);

  console.log("app render");

  return (
    <div className="App">
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
    </div>
  );
}

export default memo(App);
