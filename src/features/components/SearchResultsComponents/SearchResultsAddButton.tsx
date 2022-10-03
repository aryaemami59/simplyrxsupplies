import { Button } from "@mui/material";
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { Badge, Collapse, Fade } from "react-bootstrap";
import { shallowEqual } from "react-redux";
import { ItemObjType } from "../../../customTypes/types";
import {
  addItems,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
} from "../../../Redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

type Props = {
  itemObj: ItemObjType;
};

const SearchResultsAddButton: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow] = useState(false);
  const IfAddedToAllVendors = useAppSelector(checkIfAddedToAllVendors(itemObj));
  const vendors = useAppSelector(selectVendorsToAddTo(itemObj), shallowEqual);
  const dispatch = useAppDispatch();
  const target = useRef<null>(null);

  const showBadge = useCallback(() => {
    setShow(true);
  }, []);
  const hideBadge = useCallback(() => {
    setShow(false);
  }, []);

  const showThenHide = useCallback(() => {
    showBadge();
    setTimeout(hideBadge, 1500);
  }, [showBadge, hideBadge]);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    IfAddedToAllVendors
      ? showThenHide()
      : dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, showThenHide, dispatch, itemObj, vendors]);

  return (
    <Button
      ref={target}
      size="large"
      variant="contained"
      // size="lg"

      key={`Button-AddItemButtonComponent-${itemObj.id}`}
      onClick={clickHandler}
      // className="btn btn-success d-block w-100 position-relative mb-2 fw-bold rounded-pill shadow custom-text-shadow-white"
    >
      Add Item
      <Collapse
        in={show}
        timeout={500}
        key={`Collapse-AddItemButtonComponent-${itemObj.id}`}>
        <div key={`div-AddItemButtonComponent-${itemObj.id}`}>
          <Fade
            in={show}
            timeout={500}
            key={`Fade-AddItemButtonComponent-${itemObj.id}`}>
            <Badge
              bg="danger"
              className="d-block fw-light"
              key={`Badge-AddItemButtonComponent-${itemObj.id}`}>
              This Item Has Already Been Added!
            </Badge>
          </Fade>
        </div>
      </Collapse>
    </Button>
  );
};

export default memo<Props>(SearchResultsAddButton);
