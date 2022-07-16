import {
  Button,
  InputGroup,
  Input,
  Label,
  FormGroup,
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useEffect, useState } from "react";

function InputGroupComponent(props) {
  const [val, setVal] = useState(() => "");

  // useEffect(() => {
  //   console.log(val);
  // }, [val]);

  return (
    <>
      <Container fluid key={`Container`}>
        <Row>
          <InputGroup size="lg" className="my-4">
            <Col md="10" className="p-0">
              <FormGroup className="mb-0" floating inline>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Search..."
                  type="email"
                  className="shadow"
                  bsSize="lg"
                  onInput={e => setVal(e.target.value)}
                />
                <Label for="exampleEmail">Search...</Label>
              </FormGroup>
            </Col>
            <Col md="2" className="ps-0">
              <Button size="lg" className="form-control shadow h-100" block>
                Search
              </Button>
            </Col>
          </InputGroup>
        </Row>
      </Container>
      <ListGroup key={`InputGroupComponent-ListGroupItem`}>
        {val &&
          props.items
            .filter(e => e.name.toLowerCase().includes(val.toLowerCase()))
            .map((e, i) => (
              <Container key={`${i}-Container-${e.name}${e.itemNumber}`}>
                <ListGroupItem
                  key={`${e.name}${e.itemNumber}${i}-SearchResults-ListGroupItem-name`}>
                  {e.name}
                </ListGroupItem>
                <ListGroupItem
                  key={`${e.itemNumber}${e.name}${i}-SearchResults-ListGroupItem-itemNumber`}>
                  {e.itemNumber}
                </ListGroupItem>
              </Container>
            ))}
      </ListGroup>
    </>
  );
}

export default InputGroupComponent;
