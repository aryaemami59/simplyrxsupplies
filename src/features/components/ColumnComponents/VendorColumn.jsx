import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import { useState } from "react";
import { Container } from "reactstrap";

function VendorColumn({ officialVendorName, itemsAdded, vendorName }) {
  const [open, setOpen] = useState(() => false);
  // console.log(itemsAdded);
  return (
    <>
      <div>
        <Button
          className="position-relative"
          color="primary"
          onClick={() => setOpen(!open)}
          key={`${officialVendorName}-VendorColumn-Button`}
          block>
          {officialVendorName}{" "}
          <Badge
            className="position-absolute top-0 start-100 translate-middle border border-light opacity-75"
            key={`${officialVendorName}-VendorColumn-Badge`}
            pill
            color={itemsAdded.length ? "success" : "secondary"}>
            {itemsAdded.length}
            {/* {itemsAdded.length ? itemsAdded.length : " "} */}
          </Badge>
        </Button>
        <Collapse isOpen={open}>
          <Card>
            <CardBody>
              <ListGroup>
                {itemsAdded.map((e, i) => (
                  <Container
                    color="danger"
                    className="bg-secondary p-4"
                    key={`${e.name}-${vendorName}-VendorColumn-Container-name`}>
                    <ListGroupItem
                      color="success"
                      key={`${e.name}-${vendorName}-VendorColumn-ListGroupItem-name`}>
                      Item Name: {e.name}
                    </ListGroupItem>
                    <ListGroupItem
                      color="primary"
                      key={`${e.itemNumber}-${vendorName}-VendorColumn-ListGroupItem-number`}>
                      Item Number: {e.itemNumber}
                    </ListGroupItem>
                  </Container>
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
