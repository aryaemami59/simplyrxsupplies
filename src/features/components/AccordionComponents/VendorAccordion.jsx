import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import BadgeComponent from "../ColumnComponents/BadgeComponent";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import SingleListItem from "../SingleListItemComponents/SingleListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  addItems,
  selectAllAddedNames,
  selectAllAdded,
  selectVendorAdded,
} from "../../../addedSlice";

function VendorAccordion({
  // targetId,
  // onToggle,
  officialVendorName,
  items,
  vendorName,
  itemsAdded,
  onAdd,
}) {
  const dispatch = useDispatch();
  const vendorAdded = useSelector(selectVendorAdded(vendorName));
  const vendorAddedNames = vendorAdded.map(({ name }) => name);

  // console.log(itemsAdded);
  // const toggleHeader = useCallback(() => {
  //   return onToggle(targetId);
  // }, []);
  // const listGroupClickHandler = useCallback(e => {
  //   return !itemsAdded.includes(e) && onAdd(e);
  // }, []);

  return (
    <AccordionItem>
      <AccordionHeader
        targetId={officialVendorName}
        // targetId={targetId}
        // onClick={toggleHeader}
      >
        <BadgeComponent
          itemsAdded={itemsAdded}
          vendorAddedNames={vendorAddedNames}
          key={`${officialVendorName}-VendorColumn-Badge`}
        />
        {officialVendorName}
      </AccordionHeader>
      <AccordionBody
        accordionId={officialVendorName}
        // accordionId={targetId}
      >
        <ListGroup>
          {items
            .filter(e => e[vendorName])
            .map(e => (
              <SingleListItem
                vendorAddedNames={vendorAddedNames}
                key={`${e.name}-${vendorName}`}
                itemsAdded={itemsAdded}
                // itemsAdded={itemsAdded}
                itemObj={e}
                role="button"
                onAdd={onAdd}
              />
            ))}
        </ListGroup>
      </AccordionBody>
    </AccordionItem>
  );
}

VendorAccordion.propTypes = {
  targetId: PropTypes.string,
  onToggle: PropTypes.func,
  officialVendorName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  vendorName: PropTypes.string,
  itemsAdded: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemNumber: PropTypes.string,
    })
  ),
  onAdd: PropTypes.func,
};

// export default memo(VendorAccordion);
export default memo(
  VendorAccordion,
  (prev, next) => prev.itemsAdded.length === next.itemsAdded.length
);
