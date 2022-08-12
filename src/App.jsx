import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VendorColumnList from "./features/components/ColumnComponents/VendorColumnList";
import InputGroupComponent from "./features/components/InputComponents/InputGroupComponent";
import NavbarComponent from "./features/components/NavbarComponents/NavbarComponent";
import VerticalNavComponent from "./features/components/SideBarNavComponents/VerticalNavComponent";
import { useQuery } from "react-query";
import OffcanvasComponent from "./features/components/NavbarComponents/OffcanvasComponent";
// import OffcanvasComponent from "./features/components/NavbarComponents/OffcanvasComponent";
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

// const empty = [];

function App() {
  const { isLoading, error, data, status } = useQuery(["items"], fetchItems);

  // status === "success" && console.log(data);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center">
        <Spinner
          className="my-5"
          variant="info"
          style={{ width: "10rem", height: "10rem", borderWidth: "1rem" }}>
          Loading...
        </Spinner>
      </div>
    );
  }

  if (status === "error") {
    return <div>error</div>;
  }

  // console.log("app render");

  return (
    <div className="App">
      <NavbarComponent items={data} />
      <Container fluid>
        <Row className="">
          <Col
            md="2"
            className="ps-0 pe-0"
            style={{
              height: "calc(100vh - 56px)",
              position: "sticky",
              top: "56px",
              // overflowX: "hidden",
            }}>
            <VerticalNavComponent items={data} />
            {/* <OffcanvasComponent items={data} /> */}
          </Col>
          <Col
            md={{
              size: 4,
              // offset: 1,
            }}
            className="my-5">
            <InputGroupComponent items={data} key={`InputGroupComponent`} />
          </Col>
          <Col md="4" className="my-5">
            <VendorColumnList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default memo(App);
