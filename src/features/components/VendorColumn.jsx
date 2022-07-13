import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useState } from "react";

function VendorColumn(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <Button color="primary" onClick={() => setOpen(!open)}>
          {props.vendorName}
        </Button>
        <Collapse isOpen={open}>
          <Card>
            <CardBody>
              <ListGroup>
                {props.itemsAdded.map((e, i) => (
                  <ListGroupItem key={i}>{e.name}</ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </>
  );
}

export default VendorColumn;
