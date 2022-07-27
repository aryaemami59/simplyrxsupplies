import {
  Button,
  Collapse,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  useState,
  useContext,
  memo,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Container } from "reactstrap";
import BadgeComponent from "./BadgeComponent";
import PropTypes from "prop-types";
// import { AddedContext } from "../../../App";

function VendorColumn({ officialVendorName, vendorName, itemsAdded }) {
  // const itemsAdded = useContext(AddedContext).filter(e => e[vendorName]);
  // const itemsAddedLen = !!itemsAdded.length;
  // console.log(itemsAddedLen)
  // const itemsAdded = useContext(AddedContext);
  const [open, setOpen] = useState(() => false);
  // const [added, setAdded] = useState(() => []);
  // const [len, setLen] = useState(() => !!itemsAdded.length);

  useEffect(() => {
    // console.log("itemsAdded");
    // console.log(itemsAdded);
  }, [itemsAdded]);

  const changeLen = useMemo(() => {
    // setAdded(prev => [...prev, itemsAdded]);
    return itemsAdded;
    // return setLen(true);
  }, [itemsAdded]);

  const buttonClick = useCallback(() => {
    return setOpen(!open);
  }, [open]);

  console.log("VendorColumn");
  // console.log(added);
  return (
    <>
      <div>
        <Button
          className="position-relative"
          color="primary"
          onClick={buttonClick}
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
                {changeLen?.map((e, i) => (
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

VendorColumn.propTypes = {
  officialVendorName: PropTypes.string,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
};

export default memo(VendorColumn);
