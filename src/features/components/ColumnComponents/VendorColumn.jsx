import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useState } from "react";
import { Container } from "reactstrap";
import BadgeComponent from "./BadgeComponent";

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
          {officialVendorName}
          <BadgeComponent
            itemsAdded={itemsAdded}
            key={`${officialVendorName}-VendorColumn-Badge`}
          />
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
