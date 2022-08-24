import { ListGroup } from "react-bootstrap";
import { memo, FC } from "react";
import { shallowEqual } from "react-redux";
import SingleInputListItems from "./SingleInputListItems";
import { selectAllListItems } from "../../../addedSlice";
import VendorColumnModalComponent from "./VendorColumnModalComponent";
import { useAppSelector } from "../../../data/store";

const InputListItems: FC = (): JSX.Element => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  return (
    <>
      <VendorColumnModalComponent key={`VendorColumnModalComponent-`} />
      <ListGroup className="mt-5 px-xxl-4" key={`ListGroup-InputListItems`}>
        {listItems.map((e) => (
          <SingleInputListItems itemObj={e} key={`${e.name}-inputListItems`} />
        ))}
      </ListGroup>
    </>
  );
};

export default memo(InputListItems);
