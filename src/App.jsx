import "./App.css";
import { Col, Row, Container } from "reactstrap";
import { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";
import { useQuery } from "react-query";
const myURL =
  "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";

const fetchItems = async () => {
  // const abortCont = new AbortController();

  const response = await fetch(myURL, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3.raw.json",
      Authorization: "Bearer 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",
    },
    // signal: abortCont.signal,
  });
  const jsonItems = await response.json();
  const myItems = await jsonItems.items;
  return myItems;
};

const empty = [];

function App() {
  const { isLoading, error, data, status } = useQuery(["items"], fetchItems);

  // status === "success" && console.log(data);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  console.log("app render");

  return (
    <div className="App">
      <NavbarComponent items={data} />
      <Container>
        <Row className="my-5">
          <Col md="6">
            <InputGroupComponent items={data} key={`InputGroupComponent`} />
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
