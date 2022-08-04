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
import { useSelector, useDispatch } from "react-redux";
// import {
//   addItems,
//   selectAllAddedNames,
//   selectAllAdded,
// } from "../../../addedSlice";
import { selectAllAdded } from "../../../addedFORSSlice";
import { connect } from "react-redux";
// import { AddedContext } from "../../../App";

function VendorColumn({
  officialVendorName,
  vendorName,
  itemsAdded,
  addedItems,
}) {
  // const dispatch = useDispatch();
  console.log(addedItems);
  // const added = useSelector(selectAllAdded);
  // const added = useSelector(selectAllAdded).filter(e => e[vendorName]);
  // const itemsAdded = useContext(AddedContext).filter(e => e[vendorName]);
  // const itemsAddedLen = !!itemsAdded.length;
  // console.log(itemsAddedLen)
  // const itemsAdded = useContext(AddedContext);
  const [open, setOpen] = useState(() => false);
  // const [added, setAdded] = useState(() => []);
  // const [len, setLen] = useState(() => !!itemsAdded.length);
  useEffect(() => {
    // console.log(vendorName);
    // console.log("VendorColumn");
  });

  useEffect(() => {
    // console.log("itemsAdded");
    // console.log(itemsAdded);
  }, [itemsAdded]);

  // const changeLen = useMemo(() => {
  //   // console.log("item changed");
  //   // setAdded(prev => [...prev, itemsAdded]);
  //   return added;
  //   // return itemsAdded;
  //   // return setLen(true);
  // }, [added]);

  const buttonClick = useCallback(() => {
    return setOpen(!open);
  }, [open]);

  // console.log(vendorName);
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
            itemsAdded={addedItems}
            // itemsAdded={changeLen}
            // itemsAdded={itemsAdded}
            key={`${officialVendorName}-VendorColumn-Badge`}
          />
        </Button>
        <Collapse isOpen={open}>
          <Card>
            <CardBody>
              <ListGroup>
                {addedItems?.map((e, i) => (
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

const mapStateToProps = (state, ownProps) => {
  return {
    addedItems: state.added[ownProps.vendorName],
  };
};

// console.log(mapStateToProps);

// const mapDispatchToProps = () => {
//   return {
//     addFORSItems,
//   };
// };

// console.log(mapDispatchToProps());

export default connect(mapStateToProps)(VendorColumn);

// export default memo(VendorColumn);
// export default memo(
//   VendorColumn,
//   (p, n) => p.itemsAdded.length === n.itemsAdded.length
// );
